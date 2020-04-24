<template>
  <button
    class="SlotLever"
    @click="() => this.$emit('pull')"
    :disabled="isSpinning"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    text() {
      return this.isSpinning ? "Spinning..." : "Spin!";
    },
  },
  props: {
    isSpinning: Boolean,
  },
});
</script>

<style scoped>
.SlotLever {
  background: var(--emphasis-background-color);
  border-radius: calc(var(--horiz-padding) / 2);

  color: var(--white-color);

  cursor: pointer;
  font-family: HelveticaNeue, "HelveticaNeue", Helvetica, sans-serif;
  font-size: var(--title-size);

  line-height: 2em;
  padding: var(--vert-padding) var(--horiz-padding);

  width: var(--min-supported-width);
}

.SlotLever[disabled] {
  background: var(--gray-color);

  cursor: not-allowed;
}
</style>
