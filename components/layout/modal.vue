<template>
  <transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    showModal: {
      type: Boolean,
      required: false
    },

    title: {
      type: String,
      default: "Modal"
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>