<script setup>
import { ref } from 'vue';

import DropdownComponent from '@/components/dropdown.vue';
import IconComponent from '@/components/icon.vue';

defineOptions({name: 'select-field-component'});
const props = defineProps({
  disabled: Boolean,
  error: Boolean,
  modelValue: String,
});
defineEmits(['update:model-value']);

const fieldRef = ref(null);
const opened = ref(false);
</script>

<template>
  <div
    class="select-field-component"
    :class="{'select-field-component--disabled': disabled}"
  >
    <div class="select-field-component__label">
      <slot name="label"/>
    </div>

    <button
      class="select-field-component__field"
      :class="{
        'select-field-component__field--error': error,
        'select-field-component__field--opened': opened,
        'select-field-component__field--opened-error': opened && error,
      }"
      :disabled="disabled"
      ref="fieldRef"
      type="button"
      @click="opened = !opened;"
    >
      <div class="select-field-component__field__display">
        <slot name="display">{{ modelValue }}</slot>
      </div>

      <icon-component
        class="select-field-component__field__arrow"
        :class="{'select-field-component__field__arrow--opened': opened}"
        variant="arrow-down.outline"
      ></icon-component>

      <!-- MODALS & DROPDOWNS -->

      <teleport to="body">
        <keep-alive>
          <transition name="select-field-component__dropdown--transition">
            <dropdown-component
              class="select-field-component__dropdown"
              match-target-width
              :target="fieldRef"
              @close="opened = false;"
              v-if="opened"
            >
              <slot name="options"/>
            </dropdown-component>
          </transition>
        </keep-alive>
      </teleport>
    </button>

    <div
      class="select-field-component__error"
      v-if="error"
    >
      <slot name="error"/>
    </div>
  </div>
</template>

<style>
.select-field-component {
  display: inline-grid;
  grid-template-columns: [error-start field-start label-start] 1fr [error-end field-end label-end];
  grid-template-rows: [label-start] auto [label-end field-start] auto [field-end error-start] 1fr [error-end];
  transition-property: opacity;
}

.select-field-component--disabled {
  opacity: 0.65;
}

.select-field-component__label {
  color: var(--color-subtext);
  font-size: 0.875rem;
  font-weight: 500;
  grid-area: label;
  margin-block-end: 0.125rem;
}

.select-field-component__label:empty {
  display: none;
}

.select-field-component__field {
  align-items: center;
  background-color: transparent;
  border: 0.08rem solid var(--color-border);
  border-radius: 0.75rem;
  display: inline-grid;
  grid-area: field;
  grid-template-columns: [display-start] 1fr [display-end arrow-start] auto [arrow-end];
  grid-template-rows: [arrow-start display-start] 1fr [arrow-end display-end];
  outline: 0px solid transparent;
  outline-offset: 0px;
  padding: 0.75rem;
  transition-property: border-color, outline, outline-offset;
}

.select-field-component__field--opened,
.select-field-component__field:focus-visible {
  border-color: var(--color-primary);
  outline: 0.16rem solid var(--color-primary);
  outline-offset: 0.08rem;
}

.select-field-component__field--error {
  border-color: var(--color-danger);
}

.select-field-component__field--opened-error,
.select-field-component__field--error:focus-visible {
  border-color: var(--color-danger);
  outline-color: var(--color-danger);
}

.select-field-component__field__display {
  grid-area: display;
  overflow: hidden;
}

.select-field-component__field__arrow {
  color: var(--color-icon);
  grid-area: arrow;
  transition-property: rotate;
}

.select-field-component__field__arrow--opened {
  rotate: z -180deg;
}

.select-field-component__error {
  color: var(--color-danger);
  font-size: 0.75rem;
  font-weight: 500;
  grid-area: error;
  margin-block-start: 0.125rem;
}

.select-field-component__label:empty {
  display: none;
}

.select-field-component__dropdown--transition-enter-from,
.select-field-component__dropdown--transition-leave-to {
  opacity: 0;
  translate: 0px 1.5rem;
}

.select-field-component__dropdown--transition-enter-active,
.select-field-component__dropdown--transition-leave-active {
  transition-property: opacity, translate;
}
</style>
