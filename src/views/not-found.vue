<script setup>
import ButtonComponent from '@/components/button.vue';
import NotFoundImageComponent from '@/components/not-found-image.vue';

defineOptions({
  name: 'not-found-view',
});
</script>

<template>
  <div class="not-found-view">
    <not-found-image-component class="not-found-view__illustration"/>

    <div class="not-found-view__title">404 Not Found!</div>

    <div class="not-found-view__description">
      No worries, it happens to the best of us. Click the button below to return to the homepage.
    </div>

    <button-component class="not-found-view__action">
      LET&apos;S TAKE YOU BACK
    </button-component>
  </div>
</template>

<style>
.not-found-view {
  display: grid;
  grid-template-columns: [illustration-start] auto [illustration-end action-start description-start title-start] 1fr [action-end description-end title-end];
  grid-template-rows: [illustration-start title-start] 1fr [title-end description-start] auto [description-end action-start] 1fr [illustration-end action-end];
  gap: 1rem 2.5rem;
  margin-inline: auto;
  max-inline-size: 72.5rem;
  min-block-size: 100dvh;
  padding: 2.5rem;
  place-content: center;
}

.not-found-view__illustration {
  grid-area: illustration;
  inline-size: 35dvw;
  max-inline-size: 35rem;
  place-self: center;
}

.not-found-view__title {
  align-self: end;
  font-family: 'Odibee Sans', Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  grid-area: title;
  max-inline-size: 35rem;
}

.not-found-view__description {
  color: var(--color-subtext);
  font-weight: 300;
  grid-area: description;
  max-inline-size: 35rem;
}

.not-found-view__action {
  grid-area: action;
  place-self: start;
}
</style>
