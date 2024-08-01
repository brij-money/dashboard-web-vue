<script setup>
defineOptions({
  name: 'button-component',
});

defineProps({
  disabled: Boolean,
  submit: Boolean,
});
</script>

<template>
  <button
    class="button-component"
    :class="{'button-component--disabled': disabled}"
    :type="submit ? 'submit' : 'button'"
  >
    <slot></slot>
  </button>
</template>

<style>
.button-component {
  background-color: var(--color-primary);
  border: 0.08rem solid var(--color-primary);
  border-radius: 0.75rem;
  color: var(--color-primary-complement);
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  white-space: nowrap;
}
</style>
