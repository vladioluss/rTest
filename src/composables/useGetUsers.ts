// Получить всех пользователей из LS
export const useGetUsers = (): [] => JSON.parse(localStorage.getItem('users') || "[]")