<template>
  <span v-if="user" :style="{ backgroundColor: user.color }" class="inline-block px-2 py-1 text-white rounded">
    {{ userInitial }}
  </span>
</template>

<script>
export default {
  name: 'BadgeIndicator',

  props: {
    userId: {
      type: String,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },

  computed: {
    user() {
      return this.users.find(user => user.id === this.userId);
    },
    userInitial() {
      if (this.user) {
        return this.user.name.charAt(0).toUpperCase();
      }
      return '';
    }
  }
};
</script>
