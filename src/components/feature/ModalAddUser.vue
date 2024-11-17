<script setup lang="ts">
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import {computed, reactive} from "vue";
import {useGetUsers} from "@/composables/useGetUsers";

interface User {
  id: number;
  name: string;
  children?: User[];
}

interface FormData {
  id: number
  name: string | null
  phone: string | null
  children: {}
}

const formData = reactive<FormData>({
  children: [],
  id: 0,
  name: null,
  phone: null
})

const emit = defineEmits(['cancel'])

// Закрыть модальное окно
const closeModal = () => emit('cancel', false)

// Рекурсивный поис определенной сущности
const findUserById = (array: User[], id: number): User | undefined => {
  for (const user of array) {
    if (user.id === id) {
      return user
    }

    if (user.children.length > 0) {
      const foundUser = findUserById(user.children, id)

      if (foundUser) {
        return foundUser
      }
    }
  }
}

const users = useGetUsers()

// Создание пользователя
const addUser = () => {
  if (formData.name && formData.phone) {
    const params = {
      id: Math.floor(Math.random() * 1000),
      name: formData.name,
      phone: formData.phone,
      children: [],
    }

    // Если выбрали начальника
    if (formData.boss) {
      const boss = findUserById(users, formData.boss)
      boss.children.push(params)
    } else {
      users.push(params)
    }

    // сохраним в LS
    localStorage.setItem('users', JSON.stringify(users))
    closeModal()
  } else alert('Заполните данные')
}

const allUsersForSelect = computed(() => recurseParseUsers(users))

// Нужно для вывода в селект
const recurseParseUsers = (array: User[]): User[] => {
  const result: User[] = []

  array.forEach(user => {
    result.push(user)

    // Если есть вложенные подчененные
    if (user.children && user.children.length > 0) {
      result.push(...recurseParseUsers(user.children));
    }
  })

  return result
}
</script>

<template>
  <div class="modal">
    <h3>Добавление пользователя</h3>
    <div class="modal-form">
      <BaseInput
          v-model="formData.name"
          label="Имя"
      />
      <BaseInput
          v-model="formData.phone"
          label="Телефон"
      />
      <div class="block-boss">
        <p>Руководитель</p>
        <BaseSelect
            property="id"
            label="name"
            :values="allUsersForSelect"
            v-model="formData.boss"
        />
      </div>
      <div class="modal-footer">
        <BaseButton @click.prevent="addUser">Создать</BaseButton>
        <BaseButton @click.prevent="closeModal">Отменить</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #e5e5e5;
  padding: 15px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.block-boss {
  display: flex;
  flex-direction: column;
}
</style>