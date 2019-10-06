<template>
<section class="SlotMachine" :style="{ grid: `auto / repeat(${slots.length}, 1fr)` }">
  <slot-wheel v-for="{ name, options } in slots"
    ref="wheels"
    :key="name"
    :name="name"
    :options="options"
  />
</section>
</template>

<script lang="ts">
import Component from "vue-class-component";
import SlotWheel from "./SlotWheel.vue";
import Vue from "vue";

@Component({
  components: {
    SlotWheel
  },
  props: {
    slots: {
      default: () => [],
      type: Array
    }
  }
})
/**
 * SlotMachine holds all the Wheels
 */
export default class SlotMachine extends Vue {
  /**
   * `spin` - spins all the wheels
   * 
   * @returns {void}
   */
  async spin() {
    await Promise.all(
      (this.$refs.wheels as SlotWheel[]).map(
        wheel => wheel.spin()
      )
    );

    this.$emit("done");
  }
};
</script>

<style scoped>
.SlotMachine {
  display: grid;
  grid-column-gap: var(--horiz-padding);

  width: 100%;
  max-width: var(--max-supported-width);
  min-width: var(--min-supported-width);

  padding: var(--vert-padding) var(--horiz-padding);
}
</style>
