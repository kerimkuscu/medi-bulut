import {defineStore} from 'pinia';

export const useAppliedPackagesStore = defineStore('appliedPackages', {
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
        userId: '',
        packageId: '',
        examination: 0,
        startedAt: '',
        control: 0,
        duration: 0,
        durationUnit: null,
        price: 0,
        currency: null,
        note: null,
        searchText: ''
    }),

    actions: {
        async fetchPackages() {
            this.loading = true;
            this.items = await $fetch('http://localhost:3001/applied-packages');
            this.loading = false;
        },

        async savePackage(newPackage) {
            console.log(newPackage);
            const formData = {
                userId: newPackage.userId,
                packageId: newPackage.packageId,
                examination: newPackage.examination,
                startedAt: newPackage.startedAt,
                control: newPackage.control,
                duration: newPackage.duration,
                durationUnit: newPackage.durationUnit,
                price: newPackage.price,
                currency: newPackage.currency,
                note: newPackage.note,
            }

            try {
                const {data: responseData} = await $fetch('http://localhost:3001/applied-packages', {
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
                await fetch(`http://localhost:3001/applied-packages/${item.id}`, {
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
