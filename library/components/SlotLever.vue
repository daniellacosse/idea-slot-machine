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
  font-size: var(--paragraph-size);
  padding: var(--vert-padding) var(--horiz-padding);

  color: var(--white-color);
  background: var(--black-color);

  cursor: pointer;
}

.SlotLever[disabled] {
  background: var(--gray-color);

  cursor: not-allowed;
}
</style>
