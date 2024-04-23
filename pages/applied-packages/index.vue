<template>
  <layout-card>
    <template #header>
      <div class="flex items-center justify-between">
        {{ $t('layouts.navbar.package_usage') }}

        <div class="flex">
          <input type="text" placeholder="Paket Ara" class="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm mr-2">
          <button class="flex items-center px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm" @click="showModal = true">
            <i class="fas fa-plus mr-1"></i> Paket Uygula
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <grid-table :headers="headers" :items="items" :loading="loading">
        <template #item.startedAt="{ item }">
          <grid-date-formatter :date="item.startedAt" />
        </template>
        <template #item.userId="{ item }">
          <grid-badge-indicator :users="users" :user-id="item.userId" />
        </template>
        <template #item.packageId="{ item }">
          <grid-name-indicator :items="packages" :package-id="item.packageId" />
        </template>
        <template #item.endDate="{item}">
          <grid-end-date-formatter :started-at="item.startedAt" :duration="item.duration" :duration-unit="item.durationUnit" />
        </template>
        <template #item.price="{ item }">
          <grid-price-indicator :currency="item.currency" :price="item.price"/>
        </template>
        <template #item.actions="{ item }">
          <layout-dropdown-menu>
            <template #dropdown-menu-buttons>
              <button class="flex items-center px-2 py-1 text-black" @click="getAppliedPackageData(item)">
                <i class="fas fa-box-open mr-2" aria-hidden="true"/>
                {{ $t('applied_packages.grid.package_usage') }}
              </button>

              <button class="flex items-center px-2 py-1 text-red-500" @click="deleteAppliedPackageData(item)">
                <i class="fas fa-trash-alt mr-2" aria-hidden="true"/>
                {{ $t('layouts.general.delete') }}
              </button>
            </template>
          </layout-dropdown-menu>
        </template>
      </grid-table>
    </template>
  </layout-card>

  <layout-modal :showModal="showModal" @close="showModal = false" :title="$t('applied_packages.modal.title')">
    <form>
      <div class="mb-4">
        <label for="experts" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.expert') }}</label>
        <select id="experts" v-model="userId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="packages" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.packing_list') }}</label>
        <select id="packages" v-model="packageId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option v-for="pckg in packages" :key="pckg.id" :value="pckg.id">{{ pckg.name }}</option>
        </select>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="inspectionCount" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.number_of_examinations') }}</label>
          <input id="inspectionCount" v-model="examination" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
        <div>
          <label for="controlCount" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.number_of_checks') }}</label>
          <input id="controlCount" v-model="control" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="validityPeriod" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.validity_period_of_the_package') }}</label>
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
          <label for="fee" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.package_fee') }}</label>
          <input id="fee" v-model="price" type="number" min="0" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
        </div>
        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.currency') }}</label>
          <select id="currency" v-model="currency" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option v-for="option in currencyOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label for="startDate" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.package_start_date') }}</label>
        <input id="startDate" v-model="startedAt" type="date" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
      </div>
      <div class="mb-4">
        <label for="packageNote" class="block text-sm font-medium text-gray-700">{{ $t('applied_packages.modal.package_note') }}</label>
        <input id="packageNote" v-model="note" type="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 px-4">
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
import { useAppliedPackagesStore } from "~/stores/applied-packages.js";
import {usePackagesStore} from "~/stores/packages.js";
import { useUsersStore } from "~/stores/users.js";
import { ref } from 'vue';

export default {
  name: 'AppliedPackagesIndex',

  setup() {
    const appliedPackagesStore = useAppliedPackagesStore();
    const packagesStore = usePackagesStore();
    const usersStore = useUsersStore();

    const items = ref([]);
    const loading = ref(true);
    const currencyOptions = appliedPackagesStore.currencyOptions;
    const durationUnitOptions = appliedPackagesStore.durationUnitOptions;
    const users = ref([]);
    const packages = ref([]);

    const fetchData = async () => {
      loading.value = true;

      try {
        await appliedPackagesStore.fetchPackages();
        items.value = appliedPackagesStore.items;
      } catch (error) {
        console.error("Applied packages fetching error:", error);
      }

      try {
        await packagesStore.fetchPackages();
        packages.value = packagesStore.items;
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
    const userId = appliedPackagesStore.userId;
    const packageId = appliedPackagesStore.packageId;
    const examination = appliedPackagesStore.examination;
    const startedAt = appliedPackagesStore.startedAt;
    const control = appliedPackagesStore.control;
    const duration = appliedPackagesStore.duration;
    const durationUnit = 'day';
    const price = appliedPackagesStore.price;
    const currency = 'TRY';
    const note = appliedPackagesStore.note;

    const saveNewPackage = async () => {
      const newPackage = {
        userId: userId.value,
        packageId: packageId.value,
        examination: examination.value,
        startedAt: startedAt.value,
        control: control.value,
        duration: duration.value,
        durationUnit: durationUnit.value,
        price: price.value,
        currency: currency.value,
        note: note.value,
      };

      try {
        await appliedPackagesStore.savePackage(newPackage);
        userId.value = '';
        packageId.value = '';
        examination.value = 0;
        startedAt.value = '';
        control.value = '';
        duration.value = 0;
        durationUnit.value = 0;
        price.value = '';
        currency.value = null;
        note.value = '';
        showModal.value = false;
      } catch (error) {
        console.error("Error saving new package:", error);
      }
    };

    const getAppliedPackageData = async (data) => {
      showModal.value = true;
      examination.value = data.examination;
    };

    const deleteAppliedPackageData = async (data) => {
      try {
        await appliedPackagesStore.deletePackage(data)
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    };

    const searchText = ref('');

    const performSearch = (text) => {
      items.value = text;
    }

    return {
      items,
      loading,
      currencyOptions,
      durationUnitOptions,
      users,
      packages,
      showModal,
      userId,
      packageId,
      examination,
      startedAt,
      control,
      duration,
      durationUnit,
      price,
      currency,
      note,
      saveNewPackage,
      getAppliedPackageData,
      deleteAppliedPackageData,
      searchText
    };
  },


  data: (self = this) => ({
    headers: [
      {text: self.$t('applied_packages.grid.started_at'), value: 'startedAt'},
      {text: self.$t('applied_packages.grid.experts'), value: 'userId'},
      {text: self.$t('applied_packages.grid.name'), value: 'packageId'},
      {text: self.$t('applied_packages.grid.examination'), value: 'examination'},
      {text: self.$t('applied_packages.grid.control'), value: 'control'},
      {text: self.$t('applied_packages.grid.end_date'), value: 'endDate'},
      {text: self.$t('applied_packages.grid.package_note'), value: 'note'},
      {text: self.$t('applied_packages.grid.list_price'), value: 'price'},
      {text: self.$t('applied_packages.grid.applied_price'), value: 'appliedPrice'},
      {text: '', value: 'actions'},
    ],
    showModal: false,
  }),
}
</script>