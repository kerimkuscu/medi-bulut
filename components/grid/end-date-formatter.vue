<template>
  <span
      class="relative cursor-pointer flex-auto"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
  >
    {{ formattedEndDate }}
    <span class="absolute right-full px-14 bg-gray-200 text-black rounded whitespace-no-wrap" v-show="showTooltip">
      <div>{{ $t('layouts.general.remaining_time') }}</div>
      <div>{{ remainingDays }} {{ $t('layouts.general.day') }}</div>
    </span>
  </span>
</template>

<script>
export default {
  name: 'EndDateFormatter',

  props: {
    startedAt: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    durationUnit: {
      type: String,
      required: true,
      validator: value => ['day', 'week', 'month', 'year'].includes(value)
    }
  },
  data() {
    return {
      showTooltip: false
    };
  },
  computed: {
    formattedEndDate() {
      const startDate = new Date(this.startedAt);

      let endDate;
      if (this.durationUnit === 'day') {
        endDate = new Date(startDate.getTime() + this.duration * 24 * 60 * 60 * 1000);
      } else if (this.durationUnit === 'week') {
        endDate = new Date(startDate.getTime() + this.duration * 7 * 24 * 60 * 60 * 1000);
      } else if (this.durationUnit === 'month') {
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + this.duration;
        endDate = new Date(year, month, startDate.getDate());
      } else if (this.durationUnit === 'year') {
        const year = startDate.getFullYear() + this.duration;
        endDate = new Date(year, startDate.getMonth(), startDate.getDate());
      }

      const formattedEndDate = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;

      return formattedEndDate;
    },
    remainingDays() {
      const startDate = new Date(this.startedAt);
      const endDate = new Date(this.formattedEndDate.split('.').reverse().join('-'));
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      return Math.ceil(differenceInDays);
    }
  }
};
</script>

<style>
[v-tooltip]:hover + .tooltip {
  @apply opacity-100 scale-100;
}
</style>
