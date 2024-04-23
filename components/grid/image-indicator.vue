<template>
  <div class="flex">
    <div v-for="(image, index) in userImages.slice(0, 2)" :key="index" class="relative">
      <img class="object-cover w-8 h-8 rounded-full z-10" :src="image" :alt="index">
    </div>
    <div v-if="userImages.length > 2" class="relative">
      <img class="object-cover w-8 h-8 rounded-full z-10" :src="userImages[2]" :alt="2">
      <div class="absolute top-0 left-0 z-20">
        <div class="w-8 h-8 flex items-center justify-center bg-black rounded-full text-white">
          +{{ userImages.length - 2 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageIndicator',

  props: {
    users: {
      type: Array,
      default: []
    },
    userIds: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    userImages() {
      const userImage = this.findValue();

      return userImage ? userImage : '';
    },
  },

  methods: {
    findValue() {
      const matchedPhotoUrls = [];

      this.userIds.forEach(userId => {
        const user = this.users.find(u => u.id === userId);
        if (user && user.photoUr) {
          matchedPhotoUrls.push(user.photoUr);
        }
      });

      return matchedPhotoUrls;
    },
  },
}
</script>