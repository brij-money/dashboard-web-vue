<script setup>
defineOptions({name: 'dropdown-item-component'});
defineProps({active: Boolean});
</script>

<template>
  <button
    class="dropdown-item-component"
    :class="{'dropdown-item-component--active': active}"
    type="button"
  >
    <slot/>
  </button>
</template>

<style>
.dropdown-item-component {
  background-color: var(--color-background);
  border: none;
  border-radius: 0.75rem;
  color: var(--color-dark);
  padding: 0.5rem;
  text-align: left;
  transition-property: background-color, color;
}

.dropdown-item-component:hover {
  background-color: var(--color-boundary);
}

.dropdown-item-component--active,
.dropdown-item-component--active:hover {
  background-color: var(--color-primary-background);
  color: var(--color-primary);
}
</style>
