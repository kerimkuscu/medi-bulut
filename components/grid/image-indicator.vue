<template>
  <div class="flex">
    <div v-for="(image, index) in userImages" :key="index" class="relative">
      <img class="object-cover w-8 h-8 rounded-full z-10" :src="image" alt="">
      <div v-if="index === 2" class="absolute top-0 left-0 z-20">
        <div class="w-8 h-8 flex items-center justify-center bg-black rounded-full text-white">
          +{{ userImages.length - index }}
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
      console.log(this.userIds);

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