<script setup lang="ts">
interface Props {
  modelValue: object | string | number | null
  values: []
  property: string
  label: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const handleChange = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value
  // Если значение "null", отправляем null
  emit('update:modelValue', selectedValue === "null" ? null : JSON.parse(selectedValue))
}
</script>

<template>
  <select
      class="select"
      :value="props.modelValue"
      @change="handleChange"
  >
    <option value="null">Не выбрано</option>
    <option
        v-for="item in props.values"
        :key="item[props.property]"
        :value="JSON.stringify(item[props.property])"
    >
      {{ item[props.label] }}
    </option>
  </select>
</template>

<style scoped>
select {
  outline: none;
  border: 1px solid var(--gray-6);
  padding: 0 10px;
  height: 40px;
  border-radius: 6px;
  font-size: 15px;
}
</style>
