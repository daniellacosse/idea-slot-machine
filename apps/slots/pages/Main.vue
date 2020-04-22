<template>
  <article class="Main">
    <slot-machine ref="slotMachine" :slots="slots" @done="stopSpinning"></slot-machine>
    <slot-lever 
      @pull="startSpinning" 
      :isSpinning="isSpinning"
    ></slot-lever>
  </article>
</template>


<script lang="ts">
import Component from "vue-class-component";
import SlotLever from "../../library/components/SlotLever.vue";
import SlotMachine from "../../library/components/SlotMachine.vue";
import Vue from "vue";
import config from "../../app.config.yml";

@Component({
  components: {
    SlotLever,
    SlotMachine
  }
})
/**
 * Main, default page. contains the app.
 */
export default class Main extends Vue {
  isSpinning: boolean = false;
  slots = config.slots;

  /**
   * spins the slot machine
   * 
   * @returns {void}
   */
  startSpinning() {
    this.isSpinning = true;

    (this.$refs.slotMachine as SlotMachine).spin();
  }

  /**
   * stops the slot machine
   * 
   * @returns {void}
   */
  stopSpinning() {
    this.isSpinning = false;
  }
}
</script>


<style scoped>
.Main {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-evenly;

  width: 100vw;
  height: 100vh;
}
</style>
