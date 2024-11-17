<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import ModalAddUser from "@/components/feature/ModalAddUser.vue";
import {reactive, ref} from "vue";
import TableUsers from "@/components/feature/TableUsers.vue";
import {useGetUsers} from "@/composables/useGetUsers";

// Состояние модального окна (добавление юзера)
const showModal = ref(false)

// Все пользователи
let users = reactive(useGetUsers())

// Закрыть модалку и получить данные для таблицы
const closeModal = () => {
  showModal.value = false
  users = useGetUsers()
}
</script>

<template>
  <header>
    <h3>Работа с пользователем</h3>
  </header>

  <main>
    <div class="wrapper">
      <BaseButton @click.prevent="showModal = true">
        Добавить
      </BaseButton>
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
</style>
