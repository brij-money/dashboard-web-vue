<script setup>
import ButtonComponent from '@/components/button.vue';
import NotFoundImageComponent from '@/components/not-found-image.vue';
import { onActivated, onDeactivated, onUnmounted, ref } from 'vue';

defineOptions({name: 'not-found-view'});

const small = ref(innerWidth <= 641);

function onResize() {
  small.value = innerWidth <= 641;
}

onActivated(() => addEventListener('resize', onResize));
onUnmounted(() => removeEventListener('resize', onResize));
onDeactivated(() => removeEventListener('resize', onResize));

addEventListener('resize', onResize);
</script>

<template>
  <div class="not-found-view">
    <div
      class="not-found-view__card"
      :class="{'not-found-view__card--small': small}"
    >
      <not-found-image-component class="not-found-view__card__illustration"/>

      <div
        class="not-found-view__card__content"
        :class="{'not-found-view__card__content--small': small}"
      >
        <div
          class="not-found-view__card__content__title"
          :class="{'not-found-view__card__content__title--small': small}"
        >404 Not Found!</div>

        <div
          class="not-found-view__card__content__description"
          :class="{'not-found-view__card__content__title--small': small}"
        >
          No worries, it happens to the best of us. Click the button below to return to the homepage.
        </div>

        <button-component class="not-found-view__card__content__action">
          LET&apos;S TAKE YOU BACK
        </button-component>
      </div>
    </div>
  </div>
</template>

<style>
.not-found-view {
  align-items: center;
  display: flex;
  justify-content: center;
  min-block-size: 100dvh;
}

.not-found-view__card {
  align-items: center;
  display: flex;
  gap: 2.5rem;
  inline-size: 100%;
  margin-inline: auto;
  max-inline-size: 60rem;
  padding: 2.5rem;
}

.not-found-view__card--small {
  align-items: center;
  flex-direction: column;
}

.not-found-view__card__illustration {
  block-size: auto;
  inline-size: 100%;
  max-inline-size: 27.5rem;
}

.not-found-view__card__content {
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.not-found-view__card__content--small {
  align-items: center;
}

.not-found-view__card__content__title {
  font-family: 'Odibee Sans', Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 4rem;
  font-weight: bold;
}

.not-found-view__card__content__description {
  color: var(--color-subtext);
  font-weight: 300;
}

.not-found-view__card__content__title--small,
.not-found-view__card__content__description--small {
  text-align: center;
}
</style>
