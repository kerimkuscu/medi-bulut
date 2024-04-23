<template>
  <span> {{ priceFormatter }} </span>
</template>

<script>
export default {
  name: 'Price',

  props: {
    price: {
      type: [String, Number],
      default: ''
    },

    currency: String,
    default: ''
  },

  computed: {
    priceFormatter() {
      const price = this.formatter();
      return price ? price : '';
    }
  },

  methods: {
    formatter() {
      let formattedPrice;
      switch (this.currency) {
        case 'TRY':
          formattedPrice = this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ₺';
          break;
        case 'USD':
          formattedPrice = '$' + this.price;
          break;
        case 'EUR':
          formattedPrice = '€' + this.price;
          break;
        default:
          formattedPrice = this.price;
      }
      return formattedPrice;
    }
  }
}
</script>