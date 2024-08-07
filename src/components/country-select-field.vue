<script setup>
import ResourceSelectFieldComponent from '@/components/resource-select-field.vue';

defineOptions({name: 'country-select-field-component'});
</script>

<template>
  <resource-select-field-component
    class="country-select-field-component"
    endpoint="/api/countries"
    unique-key="id"
  >
    <template #display="{record}">
      <div class="country-select-field-component__display">
        <component
          class="country-select-field-component__display__flag"
          :is="!!record ? 'img' : 'div'"
          :src="record?.flag_url"
        />

        <div class="country-select-field-component__display__name">{{ record?.name ?? '---' }}</div>
      </div>
    </template>

    <template #label>
      <slot name="label"/>
    </template>

    <template #error>
      <slot name="error"/>
    </template>
  </resource-select-field-component>
</template>

<style>
.country-select-field-component__display {
  align-items: center;
  display: flex;
  gap: 0.75rem;
}

.country-select-field-component__display__flag {
  background-color: var(--color-boundary);
  block-size: 1.5rem;
  border-radius: 100vmax;
  inline-size: 1.5rem;
  overflow: hidden;
}
</style>
