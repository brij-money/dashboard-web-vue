<script setup>
import { computed, ref } from 'vue';

import IconComponent from '@/components/icon.vue';

defineOptions({name: 'text-field-component'});
const props = defineProps({
  disabled: Boolean,
  error: Boolean,
  icon: String,
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  }
});
defineEmits(['update:model-value']);

const visible = ref(false);
const fieldRef = ref(null);
const inputtype = computed(() => {
  switch(props.type) {
    case 'password': return visible.value ? 'text' : 'password';
    default: return props.type;
  }
});
</script>

<template>
  <div
    class="text-field-component"
    :class="{'text-field-component--disabled': disabled}"
  >
    <div class="text-field-component__label">
      <slot name="label"/>
    </div>

    <input
      class="text-field-component__field"
      :class="{
        'text-field-component__field--error': error,
        'text-field-component__field--icon': !!icon,
        'text-field-component__field--password': type == 'password',
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      ref="fieldRef"
      :type="inputtype"
      :value="modelValue"
      @input="$emit('update:model-value', $event.target.value);"
    >

    <icon-component
      class="text-field-component__icon"
      :variant="icon"
      v-if="!!icon"
    />

    <icon-component
      class="text-field-component__toggle"
      :variant="visible ? 'eye.bulk' : 'eye-slash.bulk'"
      @click="
        visible = !visible;
        fieldRef?.focus();
      "
      v-if="type == 'password'"
    />

    <div
      class="text-field-component__error"
      v-if="error"
    >
      <slot name="error"/>
    </div>
  </div>
</template>

<style>
.text-field-component {
  display: inline-grid;
  grid-template-columns: [error-start field-start icon-start label-start] auto [icon-end] 1fr [toggle-start] auto [error-end field-end label-end toggle-end];
  grid-template-rows: [label-start] auto [label-end field-start icon-start toggle-start] auto [field-end icon-end toggle-end error-start] 1fr [error-end];
  transition-property: opacity;
}

.text-field-component--disabled {
  opacity: 0.65;
}

.text-field-component__label {
  color: var(--color-subtext);
  font-size: 0.875rem;
  font-weight: 500;
  grid-area: label;
  margin-block-end: 0.125rem;
}

.text-field-component__label:empty {
  display: none;
}

.text-field-component__field {
  background-color: transparent;
  border: 0.08rem solid var(--color-border);
  border-radius: 0.75rem;
  grid-area: field;
  outline: 0px solid transparent;
  outline-offset: 0px;
  padding: 0.75rem;
  transition-property: border-color, outline, outline-offset;
}

.text-field-component__field--icon {
  padding-inline-start: 2.75rem;
}

.text-field-component__field--toggle {
  padding-inline-end: 2.75rem;
}

.text-field-component__field:focus-visible {
  border-color: var(--color-primary);
  outline: 0.16rem solid var(--color-primary);
  outline-offset: 0.08rem;
}

.text-field-component__field--error {
  border-color: var(--color-danger);
}

.text-field-component__field--error:focus-visible {
  border-color: var(--color-danger);
  outline-color: var(--color-danger);
}

.text-field-component__field::placeholder {
  color: var(--color-mute);
  font-weight: 300;
}

.text-field-component__icon {
  align-self: center;
  color: var(--color-icon);
  grid-area: icon;
  margin-inline-start: 0.83rem;
}

.text-field-component__toggle {
  align-self: center;
  cursor: pointer;
  grid-area: toggle;
  margin-inline-end: 0.83rem;
  transition-property: color;
}

.text-field-component__toggle:hover {
  color: var(--color-secondary);
}

.text-field-component__error {
  color: var(--color-danger);
  font-size: 0.75rem;
  font-weight: 500;
  grid-area: error;
  margin-block-start: 0.125rem;
}

.text-field-component__label:empty {
  display: none;
}
</style>
