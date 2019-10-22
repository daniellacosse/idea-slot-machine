<template>
  <button class="SlotLever" @click="() => this.$emit('pull')" 
    :disabled="isSpinning"
  >{{ text }}</button>
</template>

<script lang="ts">
export default {
  computed: {
    text() {
      return this.isSpinning ? "Spinning..." : "Spin!"
    }
  },
  props: {
    isSpinning: Boolean
  },
};
</script>

<style scoped>
.SlotLever {
  font-size: var(--title-size);
  padding: var(--vert-padding) var(--horiz-padding);

  color: var(--white-color);
  background: var(--emphasis-background-color);

  width: var(--min-supported-width);
  border-radius: calc(var(--horiz-padding) / 2);

  line-height: 2em;
  font-family: HelveticaNeue, "HelveticaNeue", Helvetica, sans-serif;

  cursor: pointer;
}

.SlotLever[disabled] {
  background: var(--gray-color);

  cursor: not-allowed;
}
</style>
