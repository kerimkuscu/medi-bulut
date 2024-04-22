<template>
  <button :class="{ 'bg-blue-500': isActive, 'bg-gray-300': !isActive }" class="w-12 h-6 rounded-full relative">
    <span :class="{ 'translate-x-full': isActive }" class="block w-6 h-6 bg-white rounded-full shadow-lg absolute top-0 left-0"></span>
  </button>
</template>

<script>
export default {
  name: 'Toggle',

  props: {value: {
      type: [String, Number, Boolean],
      default: true
    }
  },

  computed: {
    isActive (){
      return this.value;
    }
  },

}
</script>