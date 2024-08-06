<script setup>
import SpinnerComponent from '@/components/spinner.vue';

defineOptions({name: 'button-component'});
defineProps({
  loading: Boolean,
  submit: Boolean,
});
</script>

<template>
  <button
    class="button-component"
    :type="submit ? 'submit' : 'button'"
  >
    <slot/>

    <transition name="button-component__loader--transition">
      <div
        class="button-component__loader"
        v-if="loading"
      >
        <spinner-component class="button-component__loader__spinner"/>
      </div>
    </transition>
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
  transition-property: background-color, border-color, color, opacity, outline, outline-offset;
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

.button-component__loader {
  display: inline-block;
  margin-inline-start: 0.25rem;
  overflow: visible;
  transition-property: inline-size, opacity;
}

.button-component__loader--transition-enter-from,
.button-component__loader--transition-leave-to {
  opacity: 0;
  inline-size: 0px;
}

.button-component__loader--transition-enter-to,
.button-component__loader--transition-leave-from {
  inline-size: 1.5em;
}
</style>
