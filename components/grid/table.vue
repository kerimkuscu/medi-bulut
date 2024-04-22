<template>
  <table class="min-w-full border-collapse border border-gray-300">
    <thead>
    <tr class="bg-gray-100">
      <th
          v-for="header in visibleColumns"
          :key="header.value"
          :data-column="header.value"
          @click="sortData(header)"
          class="py-2 px-4 text-left border-b border-gray-300 cursor-pointer"
      >
        {{ header.text }}

        <span v-if="header.sortable" class="ml-1">
            <i class="fas fa-sort"></i>
          </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <slot name="loader" v-if="loading">
      <tr>
        <td :colspan="visibleColumns.length" class="text-center py-8" colspan="4">
          <p>{{ $t('layouts.general.loading') }}</p>
        </td>
      </tr>
    </slot>
    <slot name="body" :items="items">
      <slot v-for="(item, index) in items" :key="index" name="item" :item="item">
        <tr :key="index" class="border-b border-gray-300" :class="{ 'bg-gray-50': index % 2 === 0 }">
          <td v-for="header in visibleColumns" :key="header.value" class="py-2 px-4">
            <slot :name="'item.' + header.value" :item="item">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </slot>
    </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',

  props: {
    headers: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    visibleColumns() {
      return this.headers.filter(header => (header.visible || header.visible === undefined));
    },
  },

  data: () => ({
    sortBy: null,
    sortDirection: 'asc',
  }),

  methods: {
    sortData(header) {
      if (this.sortBy === header.value) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = header;
        this.sortDirection = 'asc';
      }
    }
  }
}
</script>
