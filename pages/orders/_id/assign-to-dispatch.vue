<template>
    <div v-if="pageLoading" class="col-12">
        <div class="text-center loader-for-orders">
            <Loader v-if="pageLoading"/>
        </div>
    </div>

    <div v-else>
        <OrderSummary :orderDetails="order" />
        <section class="customer-signature">
            <form @submit.prevent="assignToDispatch" class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <p><b>Assign To Dispatch:</b></p>
                            </div>
                            <div class="col-6 pl-0">
                                <div class="signature-container">
                                    <select name="staff_id" v-model="$v.data.rider_id.$model">
                                        <option value=""></option>
                                        <option v-for="rider in dispatchRiders" :key="rider.id" :value="rider.id">{{ rider.name }}</option>
                                    </select>
                                    <p class="error"
                                       v-if="!$v.data.rider_id.required && $v.data.rider_id.$dirty">
                                        Field is required.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button :disabled="$v.data.$invalid || loading" class="btn btn-primary mt-5 btn-loading">
                        {{ loading ? 'Saving' : 'Save' }}
                        <BtnLoader v-if="loading"/>
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import OrderSummary from "../../../components/OrderSummary";
import {assignToDispatchValidator} from "../../../helpers/Validators";
import BtnLoader from "../../../components/BtnLoader";
import Loader from "../../../components/Loader";

export default {
    data: () => ({
        order: {},
        dispatchRiders: [],
        data: {
            rider_id: ''
        },
        pageLoading: false,
        loading: false
    }),
    components: {OrderSummary, BtnLoader, Loader},
    validations: assignToDispatchValidator,
    async created() {
        if (this.$cookies.get('order-response')) {
            this.order = this.$cookies.get('order-response');
        }
        this.getOrder();
        this.getDispatchRiders();
    },
    async mounted() {

    },
    methods: {
        async getOrder() {
            this.pageLoading = true;
            try {
                const {data: {data}} = await this.$axios.get(`order/${this.$route.params.id}/order`);
                this.data.rider_id = data.dispatch_rider.assigned_to;
                this.order = data;
                this.pageLoading = false;
            } catch (e) {
                console.log(e);
                this.pageLoading = false;
            }
        },
        async getDispatchRiders() {
            try {
                const {data} = await this.$axios.$get('collection-officer/get-dispatch-riders');
                this.dispatchRiders = data
            } catch (e) {
                console.log(e);
            }
        },
        async assignToDispatch() {
            this.loading = true;
            try {
                const {data} = await this.$axios.post('collection-officer/assign-orders', {
                    order_id: this.order.id,
                    dispatch_rider_id: this.data.rider_id
                });

                this.$toast.success(data.message);
                this.loading = false;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        }
    },
    computed: {}
}
</script>
