<script setup lang="ts">
import {computed, defineProps, ref} from 'vue';
import TableRow from "@/components/feature/TableRow.vue";

interface TableRow {
  id: number;
  name: string;
  phone: string;
  boss?: number | null;
  children?: TableRow[];
}

const props = withDefaults(
    defineProps<{
      // Данные таблицы
      data: TableRow[];
      // Уровень вложенности
      level: number;
    }>(),
    {
      level: 0,
    }
)

// Состояние сортировки
const sortField = ref('name')
const sortDirection = ref(1)

// Функция для сортировки данных
function sortRecursive(data: TableRow[], prop: string, direction: number) {
  data.sort((a, b) => {
    if (a[prop] < b[prop]) return -1 * direction;
    if (a[prop] > b[prop]) return 1 * direction;
    return 0;
  })

  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      sortRecursive(item.children, prop, direction);
    }
  })
}

// Обработчик события для сортировки
const sortBy = (field: string) => {
  if (sortField.value === field) {
    // Меняем направление сортировки
    sortDirection.value *= -1;
  } else {
    sortField.value = field;
    sortDirection.value = 1;
  }
  sortRecursive(props.data, field, sortDirection.value);
}
</script>

<template>
  <div class="table">
    <!-- Заголовок таблицы -->
    <div class="header">
      <h4 @click="sortBy('name')">Имя</h4>
      <h4 @click="sortBy('phone')">Телефон</h4>
    </div>

    <!-- Данные таблицы -->
      <TableRow
          v-for="row in props.data"
          :key="row.id"
          :level="0"
          :data="row"
      />
  </div>
</template>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  background-color: var(--gray-0);
  padding: 8px;
  justify-content: space-around;
  border: 1px solid #e5e5e5;
}

.header h4 {
  cursor: pointer;
}
</style>
