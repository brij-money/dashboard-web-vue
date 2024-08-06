<script setup>
import iconset from '@/assets/icons.json';
import { computed } from '@vue/reactivity';

defineOptions({name: 'icon-component'});
const props = defineProps({
  variant: {
    type: String,
    default: 'directbox-default.outline',
  }
});

const paths = computed(() => {
  const [{type, style}] = [...props.variant.matchAll(/^(?<type>[a-z\d-]+)\.(?<style>[a-z\d-]+)$/g)].map(e => e.groups ?? {});

  return iconset[type]?.[style] ?? [];
});
</script>

<template>
  <svg
    class="icon-component"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      class="icon-component__path"
      :d="path.definition"
      :key="index"
      :style="{'--icon-component__path--opacity': path.opacity}"
      v-for="(path, index) of paths"
    />
  </svg>
</template>

<style>
.icon-component {
  display: inline-block;
  block-size: 1.5em;
  fill: none;
  inline-size: 1.5em;
  vertical-align: bottom;
}

.icon-component__path {
  clip-rule: evenodd;
  fill: currentColor;
  fill-rule: evenodd;
  opacity: var(--icon-component__path--opacity);
  transition-property: d, opacity;
}
</style>
