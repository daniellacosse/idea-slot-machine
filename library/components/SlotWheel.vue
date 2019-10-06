<template>
  <section
    class="SlotWheel"
    v-bind:class="{ 'SlotWheel--set': hasSpun && !isSpinning, 'SlotWheel--tick': hasTicked }"
    v-bind:style="{ 'animation-duration': `${tickDuration}ms` }"
    @animationend="_clearTick"
  >
    <div class="SlotWheel__value">{{ displayValue }}</div>
    <h2 class="SlotWheel__name">{{ name }}</h2>
  </section>
</template>


<script lang="ts">
import Component from "vue-class-component";
import ShuffleQueue from "../classes/ShuffleQueue";
import Vue from "vue";

import config from "app.config.yml";
import randomIntFactory from "../functions/randomIntFactory";

@Component({
  props: {
    name: String,
    options: Array
  }
})
/** 
 * the SlotWheel, once spun, triggers at a regular interval, taking care to not
 * repeat the same thing twice.
 */
export default class SlotWheel extends Vue {
  displayValue: string = "???";
  hasSpun: boolean = false;
  hasTicked: boolean = false;
  isSpinning: boolean = false;
  queue: ShuffleQueue<string> = new ShuffleQueue<string>(this.options);
  tickDuration: number = 0;

  startingSlotVelocityMS: Range<number> = config.startingSlotVelocityMS;
  finalTickInterval: Range<number> = config.finalTickInterval;

  /**
   * randomizes the final tick duration
   * 
   * @returns {number} the duration, in MS
   */
  randomFinalTickInterval: () => number = () => randomIntFactory(
    this.finalTickInterval.max,
    this.finalTickInterval.min
  )();

  /**
   * randomizes the initial tick velocity
   * 
   * @returns {number} the velocity, in MS
   */
  randomStartingVelocity: () => number = () => randomIntFactory(
    this.startingSlotVelocityMS.max,
    this.startingSlotVelocityMS.min
  )();

  /**
   * spin() starts spinning the slot wheel, once called.
   * 
   * @returns {Promise<void>} a promise that resolves once the wheel has stopped spinning
   */
  spin() {
    this.hasSpun = true;
    this.isSpinning = true;

    const startingVelocity = this.randomStartingVelocity();
    const finalTickInterval = this.randomFinalTickInterval();

    let nextTimeout = startingVelocity;

    return new Promise(resolve => {
      this._tick({ finalTickInterval, nextTimeout }, resolve);
    });
  }

  /**
   * _tick uses the configured frictionCoefficient to determine whether to
   * calculate another PhysicsFrame or stop the spinner
   * 
   * @param {function} resolve callback to invoke if this is the last tick on the wheel
   * @returns {void}
   */
  _tick({ finalTickInterval, nextTimeout }: PhysicsFrame, resolve) {
    this.displayValue = this.queue.pick();

    nextTimeout *= config.frictionCoeffecient;

    if (nextTimeout > finalTickInterval) {
      this.isSpinning = false;
      resolve();
    } else {
      this.tickDuration = nextTimeout / 2;
      this.hasTicked = true;

      setTimeout(() => this._tick({ finalTickInterval, nextTimeout }, resolve), nextTimeout);
    }
  }

  /**
   * clears the `hasTicked` property, which preps the SlotWheel for its next animation
   * 
   * @returns {void}
   */
  _clearTick() {
    this.hasTicked = false;
  }
}
</script>


<style scoped>
.SlotWheel {
  height: 10em;
  border: 1px solid var(--black-color);
  padding: var(--vert-padding) var(--horiz-padding);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  transition: background-color 350ms ease-out;

  will-change: background-color;
}

.SlotWheel--tick {
  animation-name: tick;
}

@keyframes tick {
  from {
    background-color: var(--tick-color);
  }
  to {
    background-color: transparent;
  }
}

.SlotWheel--tick > .SlotWheel__value {
  will-change: color;
}

.SlotWheel--set {
  background: var(--set-color);
}

.SlotWheel--set > .SlotWheel__value {
  color: var(--set-text-color);
}

.SlotWheel__value {
  text-align: center;
  font-size: var(--title-size);

  transition: color 350ms ease-out;
}

.SlotWheel__name {
  font-size: var(--footnote-size);
  text-transform: uppercase;

  color: var(--type-text-color);
}
</style>
