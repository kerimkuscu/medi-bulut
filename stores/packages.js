import {defineStore} from 'pinia';

export const usePackagesStore = defineStore('packages', {
    state: () => ({
        items: [],
        loading: true,
        currencyOptions: [
            {text: 'Türk Lirası', value: 'TRY'},
            {text: 'Dolar', value: 'USD'},
            {text: 'Euro', value: 'EUR'}
        ],
        durationUnitOptions: [
            {text: 'Gün', value: 'day'},
            {text: 'Hafta', value: 'week'},
            {text: 'Ay', value: 'month'},
            {text: 'Yıl', value: 'year'},
        ],
        packageName: '',
        examination: 0,
        control: 0,
        duration: 0,
        durationUnit: null,
        price: 0,
        currency: null,
        userIds: [],
        searchText: ''
    }),

    actions: {
        async fetchPackages() {
            this.loading = true;
            this.items = await $fetch('http://localhost:3001/packages');
            this.loading = false;
        },

        async savePackage(newPackage) {
            const formData = {
                name: newPackage.name,
                examination: newPackage.examination,
                control: newPackage.control,
                duration: newPackage.duration,
                durationUnit: newPackage.durationUnit,
                price: newPackage.price,
                currency: newPackage.currency,
                userIds: newPackage.userIds
            }

            try {
                const {data: responseData} = await $fetch('http://localhost:3001/packages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                this.items.push(newPackage);
            } catch (error) {
                console.error('Error saving package:', error);
            }
        },

        async deletePackage(item) {
            try {
                await fetch(`http://localhost:3001/packages/${item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const index = this.items.findIndex(packageItem => packageItem.id === item.id);

                if (index !== -1) {
                    this.items.splice(index, 1);
                }
            } catch (error) {
                console.error('Error deleting package:', error);
            }

        }
    }
});
