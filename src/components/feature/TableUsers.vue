<script setup lang="ts">
import { defineProps } from 'vue';
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
</script>

<template>
  <div class="table">
    <!-- Заголовок таблицы -->
    <div class="header">
      <h4>Имя</h4>
      <h4>Телефон</h4>
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
</style>
