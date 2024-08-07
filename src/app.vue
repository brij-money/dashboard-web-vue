<script setup>
import { ref, watch } from 'vue';

const transitioning = ref(false);

watch(
  transitioning,
  value => app.classList.toggle('app--transitioning', value)
);
</script>

<template>
  <router-view #default="{Component, route}">
    <transition
      :name="`app__view--${route.meta.transition ?? 'transition'}`"
      @before-enter="transitioning = true;"
      @after-enter="transitioning = false;"
    >
      <keep-alive>
        <component
          class="app__view"
          :is="Component"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.app {
  inline-size: 100%;
  min-block-size: 100dvh;
}

.app--transitioning {
  block-size: 100dvh;
  inline-size: 100%;
  overflow: hidden;
}

.app__view--transition-enter-from,
.app__view--transition-leave-to {
  opacity: 0;
  scale: 0.98;
  translate: 0px 5dvh;
}

.app__view--transition-enter-active,
.app__view--transition-leave-active {
  transition-property: all;
}

.app__view--transition-leave-active {
  position: absolute;
}
</style>
