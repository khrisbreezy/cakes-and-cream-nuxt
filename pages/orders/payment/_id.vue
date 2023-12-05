<template>
    <div v-if="pageLoading" class="col-12">
        <div class="text-center loader-for-orders">
            <Loader v-if="pageLoading"/>
        </div>
    </div>

    <div v-else>
        <OrderSummary :orderDetails="order" />
       <section class="order-summary">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form class="sign-in mt-5" @submit.prevent="paymentCompleteHandler">
                        <div class="payment-container" v-for="(paymentMethod, i) in $v.payments.$each.$iter" :key="i">
                            <div class="form-group">
                                <p><b>Payment Method</b></p>
                                <v-select :options="paymentMethods" v-model="paymentMethod.payment_method.$model"
                                    placeholder="Select a payment method"/>
                                <p class="error mt-2" v-if="!paymentMethod.payment_method.required">Field is required.</p>
                            </div>

                            <p><b>Amount Paid (₦)</b></p>
                            <label class="radio-wrapper" @click="fullPaymentHandler">Full
                                <input type="radio" checked="checked" v-model="paymentMethod.amount_paid.$model" :value="order.sub_total" :name="`order-type${i}`">
                                <span class="checkmark"></span>
                            </label>

                            <div class="d-flex">
                                <label class="radio-wrapper my-auto">Part
                                    <input type="radio" v-model="paymentMethod.part.$model" :value="showPartPayment" :name="`order-type${i}`">
                                    <span class="checkmark"></span>
                                </label>
                                <input v-if="paymentMethod.part.$model" v-model="paymentMethod.amount_paid.$model" type="text" class="ml-3">
                            </div>
                        </div>
                        <div v-if="balance > 0" @click="addNewPayment" class="add-paymt align-items-center">
                            <p>Add another payment method</p>
                            <img class="img-fluid" src="~assets/images/plus-btn.svg" alt="">
                        </div>

                        <!-- end -->

                        <div class="btn-row">
                            <button @click="$router.back()" type="button" class="btn btn-primary">Close</button>
                            <button :disabled="$v.payments.$anyError || loading || buttonDisabledAfterPay" class="btn btn-loading btn-primary" type="submit">
                                 {{ loading ? 'Saving' : 'Save' }}
                                <BtnLoader v-if="loading"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import OrderSummary from '../../../components/OrderSummary';
import 'vue-select/dist/vue-select.css';
import BtnLoader from '../../../components/BtnLoader';
import {paymentValidator} from '../../../helpers/Validators';

export default {
    data: () => ({
      order: {},
      payments: [],
      paymentMethods: [],
      loading: false,
      showPartPayment: true,
      buttonDisabledAfterPay: false,
      pageLoading: false
    }),
    validations: paymentValidator,
    components: {OrderSummary, BtnLoader},
    created() {
      if (this.$cookies.get('order-response')) {
        this.order = this.$cookies.get('order-response');
        this.$v.payments.$model = [{
            payment_method: '',
            amount_paid: this.balance,
            part: false
        }];
      }
    },
    async mounted() {
        // For csrf-cookie
        // this.$axios.$get('csrf-cookie');

        this.getOrder();

        const {data: {data: response}} = await this.$axios.get('get-payment-methods');
        this.paymentMethods = response.map(paymentMethod => ({
            label: paymentMethod.method,
            value: paymentMethod.id
        }))
    },
    methods: {
        async getOrder() {
            this.pageLoading = true;
            try {
                const {data: {data}} = await this.$axios.get(`order/${this.$route.params.id}/order`);
                this.order = data;
                this.pageLoading = false;
            } catch (e) {
                console.log(e);
                this.pageLoading = false;
            }
        },
        addNewPayment() {
            this.payments.push({
                payment_method: '',
                amount_paid: this.balance
            });
            this.payments[this.payments.length - 1]['part'] = true;
        },
        fullPaymentHandler() {
            this.$v.payments.$model = [{
                payment_method: '',
                amount_paid: this.order.sub_total,
                part: false
            }];
        },
        async paymentCompleteHandler() {
            this.loading = true;
            let payments = {
                order_id: this.order.id,
                discounts: '',
                payments: this.payments.map(payment => ({
                    payment_method: payment.payment_method.value,
                    amount_paid: +payment.amount_paid
                }))
            };

            try {
                const {data} = await this.$axios.post('cashier/order/order-payment', payments);
                this.loading = false;
                this.$toast.success(data.message);
                this.buttonDisabledAfterPay = true;
                this.$router.push('/dashboard');
            } catch(e) {
                this.loading = false;
                this.$toast.error(e.response.data.message);
                console.log(e.response);
            }
        }
    },
    computed: {
        // Getting the balance from the sub total
        balance() {
            const amount = this.payments.reduce((x, y) => +x + +y.amount_paid, 0);
            return this.order.sub_total - amount;
        }
    }

}
</script>

<style scoped>
  .order-number {
    font-size: 20px;
    color: #333333;
  }
</style>

<style lang="scss">
.payment-container {
    margin-top: 15px;
}
</style>
