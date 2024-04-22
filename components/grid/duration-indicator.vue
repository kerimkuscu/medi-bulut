<template>
  <span>{{ setDuration }}</span>
</template>

<script>
export default {
  name: 'Duration',

  props: {
    duration: {
      type: String,
      default: ''
    },

    durationUnit: {
      type: String,
      default: ''
    }
  },

  computed: {
    setDuration() {
      const duration = this.setDurationType();

      return duration ? duration : '';
    }
  },

  methods: {
    setDurationType() {
      const durationTypes = {
        day: 'layouts.duration_type.day',
        week: 'layouts.duration_type.week',
        month: 'layouts.duration_type.month',
        year: 'layouts.duration_type.year'
      };

      const durationType = durationTypes[this.durationUnit] || durationTypes.year;

      return `${this.duration} ${this.$t(durationType)}`;
    }

  }
}
</script>