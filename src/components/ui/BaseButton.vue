<script setup lang="ts">

</script>

<template>
  <button type="button">
    <slot/>
  </button>
</template>

<style scoped>
button {
  outline: none;
  width: min(100%, 180px);
  padding: 5px 0;
  cursor: pointer;
  background-color: var(--primary);
  border: 1px solid var(--gray-6);
  border-radius: 6px;
  color: var(--gray-0);
  height: 40px;
}

button:hover {
  background-color: var(--primary-hover);
  color: var(--gray-8);
}
</style>