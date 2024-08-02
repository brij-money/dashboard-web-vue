<script setup>
defineOptions({name: 'button-component'});
defineProps({submit: Boolean});
</script>

<template>
  <button
    class="button-component"
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
  cursor: pointer;
  outline: 0px solid transparent;
  outline-offset: 0px;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  transition-property: background-color, border-color, color, outline, outline-offset;
  white-space: nowrap;
}

.button-component:hover {
  background-color: var(--color-primary-hovered);
  border-color: var(--color-primary-hovered);
  color: var(--color-primary-hovered-complement);
}

.button-component:focus-visible {
  outline: 0.16rem solid var(--color-primary);
  outline-offset: 0.08rem;
}

.button-component:disabled {
  background-color: var(--color-primary);
  border: 0.08rem solid var(--color-primary);
  color: var(--color-primary-complement);
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
