<template>
  <layout-card>
    <template #header>
      <div class="flex items-center justify-between">
        {{ $t('layouts.navbar.package_identification') }}

        <div class="flex">
          <input type="text" placeholder="Paket Ara" class="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm mr-2">
          <button class="flex items-center px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm" @click="showModal = true">
            <i class="fas fa-plus mr-1"></i>Yeni Paket Ekle
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <grid-table :headers="headers" :items="items" :loading="loading">
        <template #item.userIds="{ item }">
          <grid-image-indicator :user-ids="item.userIds" :users="users"></grid-image-indicator>
        </template>
        <template #item.duration="{ item }">
          <grid-duration-indicator :duration="item.duration" :duration-unit="item.durationUnit"/>
        </template>
        <template #item.currency="{ item }">
          <grid-currency-indicator :currency="item.currency"/>
        </template>
        <template #item.price="{ item }">
          <grid-price-indicator :currency="item.currency" :price="item.price"/>
        </template>
        <template #item.status="{ item }">
          <grid-toggle-indicator :value="item.status"/>
        </template>
        <template #item.actions="{ item }">
          <layout-dropdown-menu>
            <template #dropdown-menu-buttons>
              <button class="flex items-center px-2 py-1 text-green-500" @click="getPackageData(item)">
                <i class="far fa-edit mr-2" aria-hidden="true"/>
                {{ $t('layouts.general.edit') }}
              </button>

              <button class="flex items-center px-2 py-1 text-red-500" @click="deletePackageData(item)">
                <i class="fas fa-trash-alt mr-2" aria-hidden="true"/>
                {{ $t('layouts.general.delete') }}
              </button>
            </template>
          </layout-dropdown-menu>
        </template>
      </grid-table>
    </template>
  </layout-card>

  <layout-modal :showModal="showModal" @close="showModal = false" :title="$t('package_identification.modal.title')">
    <form>
      <div class="mb-4">
        <label for="packageName" class="block text-sm font-medium text-gray-700" :class="{ 'text-red-500': !packageName, 'font-semibold': !packageName }">{{ $t('package_identification.modal.package_name') }}</label>
        <input id="packageName" v-model="packageName" type="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        <span v-if="!packageName" class="text-sm text-red-500">Paket adı girilmesi zorunludur</span>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="inspectionCount" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.number_of_inspections') }}</label>
          <input id="inspectionCount" v-model="examination" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
        <div>
          <label for="controlCount" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.number_of_controls') }}</label>
          <input id="controlCount" v-model="control" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="validityPeriod" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.validity_period_of_the_package') }}</label>
          <input id="validityPeriod" v-model="duration" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
        <div>
          <select id="durationUnit" v-model="durationUnit" class="mt-6 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option v-for="option in durationUnitOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="fee" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.fee') }}</label>
          <input id="fee" v-model="price" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.currency') }}</label>
          <select id="currency" v-model="currency" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option v-for="option in currencyOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label for="experts" class="block text-sm font-medium text-gray-700">{{ $t('package_identification.modal.appoint_expert_or_exports') }}</label>
        <select id="experts" v-model="userIds" multiple class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="flex justify-end">
        <button type="button" @click="saveNewPackage" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2">
          {{ $t('layouts.general.save') }}
        </button>

        <button type="button" @click="showModal = false" class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          {{ $t('layouts.general.cancel') }}
        </button>
      </div>
    </form>
  </layout-modal>
</template>
<script>

import { usePackagesStore } from "~/stores/packages.js";
import { useUsersStore } from "~/stores/users.js";
import { ref } from 'vue';

export default {
  name: 'PackagesIndex',

  setup() {
    const packagesStore = usePackagesStore();
    const usersStore = useUsersStore();

    const items = ref([]);
    const loading = ref(true);
    const currencyOptions = packagesStore.currencyOptions;
    const durationUnitOptions = packagesStore.durationUnitOptions;
    const users = ref([]);

    const fetchData = async () => {
      loading.value = true;

      try {
        await packagesStore.fetchPackages();
        items.value = packagesStore.items;
      } catch (error) {
        console.error("Packages fetching error:", error);
      }

      try {
        await usersStore.fetchUsers();
        users.value = usersStore.users;
      } catch (error) {
        console.error("Users fetching error:", error);
      }

      loading.value = false;
    };

    fetchData();

    const showModal = ref(false);
    const packageName = packagesStore.name;
    const examination = packagesStore.examination;
    const control = packagesStore.control;
    const duration = packagesStore.duration;
    const durationUnit = 'day';
    const price = packagesStore.price;
    const currency = 'TRY';
    const userIds = packagesStore.userIds;

    const saveNewPackage = async () => {
      const newPackage = {
        name: packageName.value,
        examination: examination.value,
        control: control.value,
        duration: duration.value,
        durationUnit: durationUnit.value,
        price: price.value,
        currency: currency.value,
        userIds: userIds.value,
      };

      try {
        if (packageName !== ref('') || packageName !== null) {
          await packagesStore.savePackage(newPackage);
          packageName.value = '';
          examination.value = 0;
          control.value = 0;
          duration.value = 0;
          durationUnit.value = '';
          price.value = 0;
          currency.value = null;
          userIds.value = null;
          showModal.value = false;
        }
        return;
      } catch (error) {
        console.error("Error saving new package:", error);
      }
    };

    const getPackageData = async (data) => {
      showModal.value = true;
      examination.value = data.examination;
    };

    const deletePackageData = async (data) => {
      try {
        await packagesStore.deletePackage(data)
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }

    return {
      items,
      loading,
      currencyOptions,
      durationUnitOptions,
      users,
      showModal,
      packageName,
      examination,
      control,
      duration,
      durationUnit,
      price,
      currency,
      userIds,
      saveNewPackage,
      getPackageData,
      deletePackageData
    };
  },


  data: (self = this) => ({
    headers: [
      {text: self.$t('package_identification.grid.name'), value: 'name', sortable: true},
      {text: self.$t('package_identification.grid.experts'), value: 'userIds', sortable: true},
      {text: self.$t('package_identification.grid.examination'), value: 'examination', sortable: true},
      {text: self.$t('package_identification.grid.control'), value: 'control', sortable: true},
      {text: self.$t('package_identification.grid.duration'), value: 'duration', sortable: true},
      {text: self.$t('package_identification.grid.service_fee'), value: 'price', sortable: true},
      {text: self.$t('package_identification.grid.currency'), value: 'currency'},
      {text: self.$t('package_identification.grid.situation'), value: 'status'},
      {text: '', value: 'actions'},
    ],
    showModal: false,
  }),
}
</script>