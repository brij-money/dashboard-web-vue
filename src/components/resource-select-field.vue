<script setup>
import axios from 'axios';
import { computed, onActivated, onDeactivated, onUnmounted, reactive, ref, watch } from 'vue';

import DropdownItemComponent from '@/components/dropdown-item.vue';
import SelectFieldComponent from '@/components/select-field.vue';
import SpinnerComponent from '@/components/spinner.vue';
import TextFieldComponent from '@/components/text-field.vue';

defineOptions({name: 'resource-select-field-component'});
const props = defineProps({
  enableSearch: Boolean,
  endpoint: {
    type: String,
    required: true,
  },
  modelValue: [
    Boolean,
    Number,
    String,
  ],
  options: {
    type: Object,
    default: {},
  },
  uniqueKey: {
    type: String,
    default: 'id',
  },
  valueParser: {
    type: Function,
    default: record => record.id,
  },
});
const emit = defineEmits(['update:model-value']);

const limit = 10;
/** @type {IntersectionObserver?} */
let intersectionObserver = null;

/** @type {import('vue').Reactive<Array<AbortController?>>} */
const abortControllers = reactive([]);
const annex = reactive([]);
const buffer = reactive([]);
const loaderRef = ref(null);
const mainRef = ref(null);
const meta = ref(null);
const page = ref(1);
const query = ref('');
/** @type {import('vue').Ref<AbortController?>} */
const refreshAbortController = ref(null);
const selected = ref(null);

const records = computed(() => [...buffer, ...annex]);

function _finalize() {
  abortAll();
  abortRefresh();

  intersectionObserver.disconnect();
}

/**
 * @param {number} index
 */
function abort(index) {
  abortControllers[index]?.abort();
  abortControllers[index] = null;
}

function abortAll() {
  for(let index = 1; index < abortControllers.length; index++) {
    abort(index);
  }
}

function abortRefresh() {
  refreshAbortController.value?.abort();
  refreshAbortController.value = null;
}

async function fetch() {
  const current = page.value;
  const index = current - 1;

  if(!abortControllers[index] && !refreshAbortController.value) {
    abortControllers[index] = new AbortController();

    try {
      const response = await axios.get(
        props.endpoint,
        {
          params: {
            ...props.options,
            page: current,
            limit,
            search: query.value,
          },
          signal: abortControllers[index].signal,
        }
      );

      const offset = index * limit;

      for(let i = 0; i < response.data.data.length; i++) {
        const record = buffer[offset + i] = response.data.data[i];
        const annexIndex = annex.findIndex(annexRecord => annexRecord[props.uniqueKey] == record[props.uniqueKey]);

        if(index >= 0) {
          annex.splice(annexIndex, 1);
        }
      }

      buffer.splice(offset + response.data.data.length);

      meta.value = response.data.pagination;
      
      if(page.value < response.data.pagination.last_page) {
        page.value++;
      }
    } catch {} finally {
      abort(index);
    }
  }
}

/** @type {IntersectionObserverCallback} */
function intersectionObserverCallback(entries) {
  for(const entry of entries) {
    if(loaderRef.value?.contains(entry.target) && entry.isIntersecting) {
      fetch();
    }
  }
}

async function refresh() {
  if(!!meta.value && !refreshAbortController.value) {
    abortAll();

    refreshAbortController.value = new AbortController();

    try {
      const response = await axios.get(
        props.endpoint,
        {
          params: {
            ...props.options,
            page: 1,
            limit: limit * page.value,
            search: query.value
          },
          signal: refreshAbortController.value.signal,
        }
      );

      for(let i = 0; i < response.data.data.length; i++) {
        const record = buffer[i] = response.data.data[i];
        const annexIndex = annex.findIndex(annexRecord => annexRecord[props.uniqueKey] == record[props.uniqueKey]);

        if(index >= 0) {
          annex.splice(annexIndex, 1);
        }
      }

      buffer.splice(response.data.data.length);

      page.value = Math.ceil(response.data.data.length / limit);
      meta.value = {
        current_page: page.value,
        next_page_url: meta.value.next_page_url,
        prev_page_url: meta.value.prev_page_url,
        first_page_url: meta.value.first_page_url,
        last_page_url: meta.value.last_page_url,
        per_page: meta.value.per_page,
        last_page: Math.ceil(response.data.pagination.total / limit),
        total: response.data.pagination.total,
      };

      if(response.data.pagination.last_page > 1) {
        page.value++;
      }
    } catch {} finally {
      abortRefresh();
    }
  }
}

watch(
  [
    () => mainRef.value?.dropdownRefEl,
    loaderRef
  ],
  ([dropdown, loader], [, oldLoader]) => {
    if(!!dropdown) {
      intersectionObserver ??= new IntersectionObserver(
        intersectionObserverCallback,
        {
          root: dropdown,
          threshold: 0.75,
        }
      );

      if(!!loader) {
        intersectionObserver.observe(loader);
      } else if(!!oldLoader) {
        intersectionObserver.unobserve(oldLoader);
      }
    } else {
      intersectionObserver?.disconnect();
      intersectionObserver = null;
    }
  }
);

watch(query, () => {
  abortAll();

  page.value = 1;

  fetch();
});
watch(selected, value => {
  emit('update:model-value', props.valueParser(records.value.find(record => record[props.uniqueKey] == value)));

  mainRef.value?.close();
});

onUnmounted(_finalize);
onActivated(() => refresh());
onDeactivated(_finalize);
</script>

<template>
  <select-field-component
    class="resource-select-field-component"
    :model-value="modelValue"
    ref="mainRef"
    @close="abortRefresh();"
    @open="refresh();"
    @update:model-value="$emit('update:model-value', $event);"
  >
    <template #display>
      <slot
        name="display"
        :record="records.find(record => record[uniqueKey] == selected)"
      />
    </template>

    <template #label>
      <slot name="label"/>
    </template>

    <template #error>
      <slot name="error"/>
    </template>

    <template 
      #actions
      v-if="enableSearch"
    >
      <div class="resource-select-field-component__actions">
        <text-field-component
          class="resource-select-field-component__actions__search"
          :disabled="!!refreshAbortController"
          icon="search-normal.bulk"
          placeholder="Search here..."
          v-model="query"
        ></text-field-component>
      </div>
    </template>

    <template #options>
      <transition-group
        class="resource-select-field-component__list"
        name="resource-select-field-component__list--transition"
        tag="div"
      >
        <dropdown-item-component
          class="resource-select-field-component__list__item"
          :active="record?.[uniqueKey] == selected"
          :key="record?.[uniqueKey]"
          @click="selected = record?.[uniqueKey] ?? null;"
          v-for="record of records"
        >
          <slot
            name="display"
            :record="record"
          />
        </dropdown-item-component>
      </transition-group>

      <transition name="resource-select-field-component__loader--transition">
        <div
          class="resource-select-field-component__loader"
          ref="loaderRef"
          v-if="!meta || page < meta.last_page || abortControllers.some(Boolean) || !!refreshAbortController"
        >
          <spinner-component class="resource-select-field-component__loader__spinner"></spinner-component>
        </div>
      </transition>
    </template>
  </select-field-component>
</template>

<style>
.resource-select-field-component__actions {
  display: grid;
  grid-template-columns: [search-start] 1fr [search-end];
  grid-template-rows: [search-start] 1fr [search-end];
}

.resource-select-field-component__actions__search {
  grid-area: search;
}

.resource-select-field-component__list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.resource-select-field-component__list--transition-enter-active,
.resource-select-field-component__list--transition-leave-active,
.resource-select-field-component__list--transition-move {
  transition-property: all;
}

.resource-select-field-component__list--transition-enter-to,
.resource-select-field-component__list--transition-leave-from {
  opacity: 0;
  scale: 0.95;
}

.resource-select-field-component__loader {
  block-size: 2.5rem;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.resource-select-field-component__loader--transition--enter-active,
.resource-select-field-component__loader--transition--leave-active {
  overflow: visible;
  transition-property: all;
}

.resource-select-field-component__loader--transition--enter-to,
.resource-select-field-component__loader--transition--leave-from {
  block-size: 0px;
  opacity: 0;
}
</style>
