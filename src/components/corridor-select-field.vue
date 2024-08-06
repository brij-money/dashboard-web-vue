<script setup>
defineOptions({name: 'corridor-select-field-component'});
</script>

<template>
  <div class="corridor-select-field-component">
    <div class="corridor-select-field-component__label">
      <slot name="label"/>
    </div>

    <button
      class="corridor-select-field-component__handle"
      type="button"
    ></button>

    <div class="corridor-select-field-component__error">
      <slot name="error"/>
    </div>
  </div>
</template>

<style>
</style>
