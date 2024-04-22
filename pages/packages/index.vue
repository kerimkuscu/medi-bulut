<template>
  <layout-card>
    <template #header>
      {{ $t('layouts.navbar.package_identification') }}
    </template>
    <template #body>
      <grid-table :headers="headers" :items="items" />
    </template>
  </layout-card>
</template>
<script>

import Table from "~/components/grid/table.vue";

export default {
  name: 'PackagesIndex',
  components: {Table},

  data: (self = this) => ({
    items: [],
    headers: [
      {text: self.$t('package_identification.grid.name'), value: 'name', sortable: true},
      {text: self.$t('package_identification.grid.experts'), value: 'userIds', sortable: true},
      {text: self.$t('package_identification.grid.examination'), value: 'examination', sortable: true},
      {text: self.$t('package_identification.grid.control'), value: 'control', sortable: true},
      {text: self.$t('package_identification.grid.duration'), value: 'duration', sortable: true},
      {text: self.$t('package_identification.grid.service_fee'), value: 'price', sortable: true},
      {text: self.$t('package_identification.grid.currency'), value: 'currency'},
      {text: self.$t('package_identification.grid.situation'), value: 'status'},
    ]
  }),

  async mounted() {
    this.loading = true;
    this.items = await $fetch(' http://localhost:3001/packages')
    this.loading = false;
  },
}
</script>