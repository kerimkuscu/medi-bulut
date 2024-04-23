<template>
  <span>{{ formattedDate }}</span>
</template>

<script>
export default {
  name: 'DateFormatter',

  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const dateObj = new Date(this.date);

      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;

      return formattedDate;
    }
  }
};
</script>
