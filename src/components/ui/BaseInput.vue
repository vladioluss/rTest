<script setup lang="ts">
import {watch} from "vue";

interface Props {
  modelValue: string | null
  label?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: null
})

const emit = defineEmits(['update:modelValue'])

const handleInput = ($event) => {
  emit('update:modelValue', $event.target.value)
}
</script>

<template>
  <div class="input">
    <label v-if="props.label">{{ props.label }}</label>
    <input
        type="tel"
        pattern="/(?:\+?)[78]+[0-9() -]{16,17}/"
        :value="modelValue"
        @input="handleInput($event)"
        class="input"
    />
  </div>
</template>

<style scoped>
.input {
  width: min(100%, 300px);
}

input {
  outline: none;
  border: 1px solid var(--gray-6);
  padding: 0 10px;
  height: 40px;
  border-radius: 6px;
  font-size: 15px;
}
</style>