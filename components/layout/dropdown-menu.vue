<template>
  <div class="relative" @click="toggleDropdown">
    <button class="border-2 font-bold rounded-xl">
      <i class="fas fa-ellipsis-h p-1" aria-hidden="true" />
    </button>

    <div v-if="isOpen" class="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
      <slot name="dropdown-menu-buttons" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',

  data:() =>  ({
    isOpen: false,
  }),

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  }
};
</script>