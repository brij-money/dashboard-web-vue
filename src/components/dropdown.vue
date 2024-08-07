<script setup>
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

import useOverlay from '@/composables/overlay.js';

defineOptions({name: 'dropdown-component'});
const props = defineProps({
  matchTargetWidth: Boolean,
  target: HTMLElement,
  whitelist: Array,
});
const emit = defineEmits(['close']);

let adjustFrame;
let frame;

const { index, peak } = useOverlay();

const adjusted = ref(false);
const height = ref(0);
const left = ref(0);
const mainRef = ref(null);
const scrollHeight = ref(0);
const targetBounds = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});
const top = ref(0);

function _finalize() {
  next(true);
}

function _initialize() {
  adjust();
}

function adjust() {
  if(!!props.target && !!mainRef.value && !adjusted.value) {
    adjusted.value = true;

    addEventListener('click', onBlur);

    const targetRect = props.target.getBoundingClientRect();
    const mainRect = mainRef.value.getBoundingClientRect();
    targetBounds.top = targetRect.top;
    targetBounds.left = targetRect.left;
    targetBounds.height = targetRect.height;
    targetBounds.width = targetRect.width;

    const fontSize = Math.min(14, 0.03889 * innerWidth);

    //Horizontal Placement
    // left.value = targetRect.left + targetRect.width / 2 - mainRect.width / 2;
    left.value = targetRect.left;

    if(left.value >= 0 || left.value <= innerWidth - mainRect.width) {
      left.value = Math.min(innerWidth, Math.max(0, left.value));
    }

    //Vertical Alignment
    const minHeight = 15 * fontSize ;
    const spaceBelow = innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    const below = spaceBelow >= minHeight || spaceBelow >= spaceAbove;

    height.value = Math.max(minHeight, Math.min(below ? spaceBelow : spaceAbove, mainRect.height));
    top.value = below ? targetRect.bottom : (targetRect.top - height.value);

    next();
  } else if((!mainRef.value || !props.target) && adjusted.value) {
    next(true);
  }
}

function loop(stop = false) {
  const rect = props.target?.getBoundingClientRect();
  const exit = rect == null
    || targetBounds.left != rect.left
    || targetBounds.width != rect.width
    || targetBounds.top != rect.top
    || targetBounds.height != rect.height
    || rect.top > innerHeight
    || rect.bottom < 0
    || rect.left > innerWidth
    || rect.right < 0;

  if(exit) {
    next(true);

    return;
  }

  adjust();

  next(stop);
}

function next(stop = false) {
  if(stop) {
    adjusted.value = false;

    emit('close');
    cancelAnimationFrame(frame);
    removeEventListener('click', onBlur);

    return;
  }

  if(!!mainRef.value) {
    const fontSize = Math.min(14, 0.03889 * innerWidth);
    const currentHeight = Math.max(15 * fontSize, Math.min(21.5 * fontSize, mainRef.value.scrollHeight));

    if(scrollHeight.value != currentHeight) {
      scrollHeight.value = currentHeight;
      adjusted.value = false;
    }
  }

  frame = requestAnimationFrame(() => loop(stop));
}

function onBlur(event) {
  const cancel = !peak.value
    || !mainRef.value
    || mainRef.value.contains(event.target)
    || props.target?.contains(event.target)
    || props.whitelist?.some(element => element?.contains(event.target));

  if(cancel) {
    return;
  }

  next(true);
}

watch(
  [
    () => props.target,
    mainRef
  ],
  () => adjust()
);

onMounted(_initialize);
onUnmounted(_finalize);
onActivated(_initialize);
onDeactivated(_finalize);
</script>

<template>
  <div
    class="dropdown-component overlay"
    ref="mainRef"
    :style="{
      '--dropdown-component--block-size': adjusted ? `${height}px` : undefined,
      '--dropdown-component--inline-size': (adjusted && matchTargetWidth) ? `${targetBounds.width}px` : undefined,
      '--dropdown-component--inset-block-start': adjusted ? `${top}px` : undefined,
      '--dropdown-component--inset-inline-start': adjusted ? `${left}px` : undefined,
      '--overlay--index': index,
    }"
  >
    <slot/>
  </div>
</template>

<style>
:where(.dropdown-component) {
  inline-size: var(--dropdown-component--inline-size, 17.5rem);
  max-block-size: 21.5rem;
}

.dropdown-component {
  background-color: var(--color-surface);
  block-size: var(--dropdown-component--block-size);
  box-shadow: 0.16rem 0.16rem 0.32rem 0px var(--color-shadow);
  border-radius: 0.75rem;
  inset-block-start: var(--dropdown-component--inset-block-start);
  inset-inline-start: var(--dropdown-component--inset-inline-start);
  overflow: hidden auto;
}
</style>
