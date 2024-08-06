<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import BrijLogoComponent from '@/components/brij-logo.vue';
import ButtonComponent from '@/components/button.vue';
import SelectFieldComponent from '@/components/select-field.vue';
import TextFieldComponent from '@/components/text-field.vue';
import useAuthStore from '@/stores/auth.js';

defineOptions({name: 'login-view'});

const router = useRouter();

const authStore = useAuthStore();

const abortController = ref(null);
const errors = ref(null);
const form = reactive({
  corridor: '',
  email: '',
  password: '',
});

function abort() {
  abortController.value?.abort();
  abortController.value = null;
}

async function submit() {
  if(!abortController.value) {
    abortController.value = new AbortController();

    try {
      const message = await authStore.login(
        form.email,
        form.password,
        form.corridor,
        abortController.value.signal
      );

      // toast or something

      errors.value = null;

      await router.push(authStore.fallback);
    } catch(error) {
      // express error na..

      if(error.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      abort();
    }
  }
}
</script>

<template>
  <div class="login-view">
    <form
      class="login-view__card"
      @submit.prevent="submit();"
    >
      <div class="login-view__card__title">Login</div>

      <select-field-component
        class="login-view__card__field"
        :disabled="!!abortController"
        v-model="form.corridor"
      >
        <template #label>Corridor</template>
        <template #options>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum adipisci magni quidem repellendus. Nemo neque ipsum, labore quia error aspernatur sed facilis, repellat officia placeat delectus nisi temporibus qui blanditiis totam nesciunt aperiam, maiores praesentium omnis obcaecati distinctio voluptate. Necessitatibus, ullam animi doloribus debitis facere nisi adipisci omnis esse, ipsum voluptates iusto, molestias enim quibusdam alias commodi? Recusandae earum et ipsum exercitationem sequi soluta, aliquam nobis, accusantium nam maiores aliquid? Tempore officiis omnis voluptatem debitis quisquam veritatis rerum quos placeat esse ipsam. Saepe consequatur provident ipsa in pariatur minus. Modi laudantium nostrum cum fugiat minus quos quisquam aspernatur omnis officia.
        </template>
      </select-field-component>

      <text-field-component
        class="login-view__card__field"
        :disabled="!!abortController"
        :error="!!errors?.email?.[0]"
        icon="sms.bulk"
        v-model="form.email"
      >
        <template #label>Email Address</template>
        <template #error>{{ errors?.email?.[0] }}</template>
      </text-field-component>
      
      <text-field-component
        class="login-view__card__field"
        :disabled="!!abortController"
        :error="!!errors?.password?.[0]"
        icon="key-square.bulk"
        type="password"
        v-model="form.password"
      >
        <template #label>Password</template>
        <template #error>{{ errors?.password?.[0] }}</template>
      </text-field-component>

      <button-component
        class="login-view__card__action"
        :disabled="!!abortController"
        :loading="!!abortController"
        submit
      >Sign In</button-component>
    </form>

    <div class="login-view__bottom">
      <brij-logo-component
        class="login-view__bottom__logo"
        dark
      />
      <div class="login-view__bottom__text">Admin Portal</div>
    </div>
  </div>
</template>

<style>
.login-view {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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

.login-view__bottom {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.login-view__bottom__logo {
  block-size: auto;
  inline-size: 5rem;
}

.login-view__bottom__text {
  color: var(--color-dark);
  font-size: 1.125rem;
  font-weight: 500;
}
</style>
