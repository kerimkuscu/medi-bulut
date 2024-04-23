<template>
  <span> {{ currencyFormatter }} </span>
</template>

<script>
export default {
  name: 'Currency',

  props: {
    currency: {
      type: String, Number,
      default: ''
    }
  },

  computed: {
    currencyFormatter() {
      const currency = this.formatter();
      return currency ? currency : '';
    }
  },

  methods: {
    formatter() {
      switch(this.currency) {
        case 'TRY':
          return "Türk Lirası (₺)";
        case 'USD':
          return "US Dollar ($)";
        case 'EUR':
          return "Euro (€)";
        default:
          return this.currency;
      }
    }
  }
}
</script>