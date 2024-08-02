<script setup>
import { reactive } from 'vue';

import ButtonComponent from '@/components/button.vue';
import TextFieldComponent from '@/components/text-field.vue';

defineOptions({name: 'login-view'});

const form = reactive({
  email: '',
  password: '',
});
</script>

<template>
  <div class="login-view">
    <form
      class="login-view__card"
      @submit.prevent
    >
      <div class="login-view__card__title">Login</div>

      <text-field-component
        class="login-view__card__field"
        icon="sms.bulk"
        v-model="form.email"
      >
        <template #label>Email Address</template>
      </text-field-component>
      
      <text-field-component
        class="login-view__card__field"
        icon="key-square.bulk"
        type="password"
        v-model="form.password"
      >
        <template #label>Password</template>
      </text-field-component>

      <button-component
        class="login-view__card__action"
        submit
      >Sign In</button-component>
    </form>
  </div>
</template>

<style>
.login-view {
  align-items: center;
  display: flex;
  justify-content: center;
  min-block-size: 100dvh;
}

.login-view__card {
  background-color: var(--color-surface);
  border: 0.08rem solid var(--color-boundary);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
  inline-size: calc(100% - 2rem);
  margin-block: 1.5rem;
  margin-inline: 1rem;
  max-inline-size: 27.5rem;
  padding: 2.5rem;
}

.login-view__card__title {
  color: var(--color-dark);
  font-size: 2.5rem;
  font-weight: bold;
  margin-block-end: 1.5rem;
}

.login-view__card__action {
  margin-block-start: 1.5rem;
}
</style>
