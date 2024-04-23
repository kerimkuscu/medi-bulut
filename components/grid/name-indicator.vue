<template>
  <span v-if="package">
    {{ package.name }}
  </span>
</template>

<script>
export default {
  name: 'NameIndicator',

  props: {
    items: {
      type: Array,
      required: true
    },
    packageId: {
      type: String,
      required: true
    }
  },

  computed: {
    package() {
      return this.items.find(item => item.id === this.packageId);
    }
  }
};
</script>
