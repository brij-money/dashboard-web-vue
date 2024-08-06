<script setup>
defineOptions({name: 'spinner-component'});
</script>

<template>
  <div class="spinner-component"/>
</template>

<style>
.spinner-component {
  block-size: 1.5em;
  display: inline-block;
  inline-size: 1.5em;
  vertical-align: bottom;
}

.spinner-component::before,
.spinner-component::after {
  block-size: 100%;
  border: 0.24em solid transparent;
  border-radius: 100vmax;
  content: '';
  inline-size: 100%;
  inset-block-start: 0px;
  inset-inline-start: 0px;
  position: absolute;
}

.spinner-component::before {
  border-color: currentColor;
  opacity: 0.4;
}

.spinner-component::after {
  animation-duration: 720ms;
  animation-name: spinner-component;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-block-start-color: currentColor;
}

@keyframes spinner-component {
  0% {
    rotate: z 0deg;
  }
  100% {
    rotate: z 360deg;
  }
}
</style>
