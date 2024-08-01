<script setup>
</script>

<template>
  <router-view #default="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style>
.app {
  inline-size: 100%;
  min-block-size: 100dvh;
}
</style>
