<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import ModalAddUser from "@/components/feature/ModalAddUser.vue";
import {ref, watch} from "vue";
import TableUsers from "@/components/feature/TableUsers.vue";
import {useGetUsers} from "@/composables/useGetUsers";

// Состояние модального окна (добавление юзера)
const showModal = ref(false)

// Все пользователи
const users = ref(useGetUsers())

// Закрыть модалку и получить данные для таблицы
const closeModal = () => {
  showModal.value = false
  users.value = useGetUsers()
}

const defaultLocalStorage = () => {
  const defaultUsers = [
    {"id":1,"name":"Марина","phone":"+7 941 123 21 42","children":[{"id":118,"name":"3333","phone":"33","children":[{"id":627,"name":"444","phone":"44","children":[]}]}]},
    {"id":2,"name":"Петр","phone":"+7 941 123 21 42","children":[]},
    {"id":3,"name":"Алексей","phone":"+7 941 123 21 42","children":[{"id":4,"name":"Иван","phone":"+7 941 123 21 42","children":[]}]},
    {"id":6,"name":"Борис","phone":"+7 941 123 21 42","children":[]}
  ]
  localStorage.setItem('users', JSON.stringify(defaultUsers))
  users.value = defaultUsers
}
</script>

<template>
  <header>
    <h3>Работа с пользователем</h3>
  </header>

  <main>
    <div class="wrapper">
      <div class="btns">
        <BaseButton @click.prevent="showModal = true">
          Добавить
        </BaseButton>
        <BaseButton @click.prevent="defaultLocalStorage">
          Получить стандартные
        </BaseButton>
      </div>

      <TableUsers
          :data="users"
          :level="0"
      />
    </div>

    <ModalAddUser
        v-if="showModal"
        @cancel="closeModal"
        :users="users"
    />
  </main>
</template>

<style scoped>
header {
  padding: 15px;
  text-align: center;
}

main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.wrapper {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: clamp(300px, 100%, 800px);
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
