<script setup lang="ts">
import {computed, defineProps, ref} from 'vue';

const props = defineProps<{
  data: object // Данные таблицы
  level: number // Уровень вложенности
}>()

// Локальное состояние для управления раскрытием строк
const expandedRows = ref<boolean>(false)

// Переключение видимости дочерних элементов
const toggleRow = () => {
  expandedRows.value = !expandedRows.value
}

// Есть дочерние элементы
const isChildren = computed(() => props.data?.children?.length > 0)
</script>

<template>
  <div>
    <div>
      <!-- Строка -->
      <div
          class="row-content"
          @click="toggleRow"
      >
        <span :class="{isChildren}">{{ data.name }}</span>
        <span>{{ data.phone }}</span>
      </div>

      <!-- Дочерние строки -->
      <div v-if="expandedRows">
        <TableRow
            class="children"
            v-for="child in data.children"
            :key="child.id"
            :level="level + 1"
            :data="child"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row-content {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  border: 1px solid #e5e5e5;
}

.row-content:hover {
  background-color: var(--gray-0);
}

.children {
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* Отступ для вложенных строк */
}

.isChildren::before {
  content: '+ ';
  position: relative;
  top: 0;
  left: 0;
}
</style>
