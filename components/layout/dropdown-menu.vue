<template>
  <div class="relative">
    <button class="border-2 font-bold rounded-xl" @click="toggleDropdown">
      <i class="fas fa-ellipsis-h p-1" aria-hidden="true" />
    </button>

    <div v-if="isOpen" class="absolute z-10 mt-2 w-44 bg-white rounded-md shadow-lg right-3">
      <slot name="dropdown-menu-buttons" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
