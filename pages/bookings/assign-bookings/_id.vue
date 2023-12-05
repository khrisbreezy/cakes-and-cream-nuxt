<template>
     <section class="booking-summary">
        <div class="container">
            <div class="row">
                <div v-if="loading" class="col-12">
                        <div class="text-center loader-for-orders">
                            <Loader v-if="loading"/>
                        </div>
                </div>
                <template v-else>
                    <div class="col-12">
                        <h1>Assign Bookings</h1>
                    </div>
                    <div class="col-12">
                        <p class="text-center order-number">Order {{order.order_no}}</p>

                         <form class="sign-in order-form" @submit.prevent="assignOfficers">
                            <div class="form-group">
                                <label>Assign Bookings to production officers</label>
                                <v-select :options="production_officers" multiple
                                    v-model="productionOfficers"
                                    placeholder="Select production officers"/>
                            </div>
                            <div class="btn-row">
                                <button @click="$router.back()" class="btn light-grey" type="button">Back</button>
                               <button :disabled="productionOfficers.length === 0" class="btn btn-loading" type="submit">
                                {{ btnLoading ? 'Saving' : 'Done' }}
                                <BtnLoader v-if="btnLoading"/>
                            </button>
                            </div>
                        </form>
                    </div>
                    
                </template>
            </div>
        </div>
    </section>
</template>   

<script>
import Loader from '../../../components/Loader';
import BtnLoader from '../../../components/BtnLoader';
export default {
    data: () => ({
        order: {},
        loading: false,
        production_officers: [],
        productionOfficers: [],
        btnLoading: false
    }),
    components: {Loader, BtnLoader},
    async created() {
        this.fetchSingleorder();
        try {
            const {data: {data}} = await this.$axios.get(`production-manager/production-officers`);
            this.production_officers = data.map(d => ({value: d.id, label: `${d.first_name} ${d.last_name}`}));
        } catch (e) {
            console.log(e);
        }
        
    },
    mounted() {

    },
    methods: {
        async fetchSingleorder() {
            this.loading = true;
            try {
                const {data: {data}} = await this.$axios.get(`production-manager/orders/${this.$route.params.id}`);
                console.log({data});
                this.order = data;
                this.productionOfficers = data.staffs_assigned.map(staff => ({
                    ...staff,
                    label: staff.first_name ? `${staff.first_name} ${staff.last_name}` : '',
                    value: staff.id ? staff.id : '',
                }))
                this.loading = false;
            } catch(e) {
                console.log(e);
                this.loading = false;
            } 
        },
        async assignOfficers() {
             this.btnLoading = true;
            try{
                const {data} = await this.$axios.post(`production-manager/assign-order/${this.order.id}`, {
                    production_officers_id: this.productionOfficers.map(p => p.value)
                });
                this.$toast.success('Ordr assigned to officers');
                this.btnLoading  = false;
            } catch(e) {
                console.log(e);
                this.btnLoading  = false;
            }
        }
    }
}
</script>

