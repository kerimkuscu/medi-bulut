import { defineStore } from 'pinia';
export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
    }),

    actions: {
        async fetchUsers() {
            this.users = await $fetch('http://localhost:3001/users');
        }
    }
});
