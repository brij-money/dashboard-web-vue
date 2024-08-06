import { computed, onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';

import useOverlayStore from '@/stores/overlay.js';

export default function() {
  const overlayStore = useOverlayStore();

  const _uid = ref(overlayStore.init());

  const uid = computed(() => _uid.value);
  const index = computed(() => overlayStore.index(_uid.value));
  const peak = computed(() => overlayStore.peak(_uid.value));

  onMounted (() => requestAnimationFrame(() => overlayStore.push(_uid.value)));
  onUnmounted (() => requestAnimationFrame(() => overlayStore.pop(_uid.value)));
  onActivated (() => requestAnimationFrame(() => overlayStore.push(_uid.value)));
  onDeactivated (() => requestAnimationFrame(() => overlayStore.pop(_uid.value)));
  
  return {
    uid,
    index,
    peak,
  };
}