import { defineStore } from 'pinia';
export const usePackagesStore = defineStore('packages', {
    state: () => ({
        items: [],
        loading: true,
        packageName: '',
        inspectionCount: 0,
        controlCount: 0,
        validityPeriod: 0,
        fee: 0,
        currency: null,
        experts: null,
    }),

    actions: {
        async fetchPackages() {
            this.loading = true;
            this.items = await $fetch('http://localhost:3001/packages');
            this.loading = false;
        },

        async savePackage(newPackage) {
            const { data: responseData } = await useFetch('http://localhost:3001/packages', {
                method: 'post',
                body: {
                    name: this.packageName,
                    examination: this.inspectionCount,
                    control: this.controlCount,
                    duration: this.validityPeriod,
                    price: this.fee,
                    currency: this.currency,
                    userIds: this.experts
                }
            });
            this.items.push(newPackage);
        }
    }
});
