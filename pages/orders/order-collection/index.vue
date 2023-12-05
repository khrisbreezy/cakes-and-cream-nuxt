<template>
    <div>
        <OrderSummary :orderDetails="orderDetails" />
        <section class="customer-signature">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                 <p><b>Customer's Signature:</b></p>
                            </div>
                            <div class="col-6 pl-0">
                                <div class="signature-container">
                                    <VueSignaturePad width="100%" height="50px" ref="signaturePad" />
                                </div>
                                 <div>
                                    <button @click="clear" class="btn btn-undo">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="d-flex justify-content-end">
                    <button @click="save" class="btn btn-primary mt-5 btn-loading">
                        {{ loading ? 'Saving' : 'Save' }}
                        <BtnLoader v-if="loading"/>
                    </button>
                </div>
            </div> 
        </section>       
    </div>
</template>

<script>
import OrderSummary from '../../../components/OrderSummary';
import BtnLoader from '../../../components/BtnLoader';

export default {
    data: () => ({
        orderDetails: {},
        loading: false,
        option: {
            penColor:"rgb(0, 0, 0)",
            backgroundColor:"rgb(255,255,255)"
        },

    }),
    components: {OrderSummary, BtnLoader},
    created() {
        if (this.$cookies.get('order-response')) {
        this.orderDetails = this.$cookies.get('order-response');
      }
    },
    mounted() {
        // For csrf-cookie
        this.$axios.$get('csrf-cookie');
    },
    methods: {
        clear() {
            this.$refs.signaturePad.clearSignature();
        },
        async save() {
            this.loading = true;
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            console.log(isEmpty);
            console.log(data);
            if (!isEmpty) {
                const formData = new FormData();
                formData.append('customer_signature', data);
                formData.append('order_id', this.orderDetails.id);
                // console.log(formData.entries());
                try {
                    let url = '';
                    if(this.userRole === 'collection officer') {
                        url = 'collection-officer/add-customer-signature';
                    } else {
                        url = 'logistics/add-customer-signature'
                    }
                 
                    const {data} = await this.$axios.post(url, formData);
                    console.log(data, 'the response');
                    this.loading = false;
                    this.$toast.success(data.message);
                    this.$router.push('/orders');
                } catch(e) {
                    console.log(e.response);
                    this.loading = false;
                    this.$toast.error(e.response.data.message);
                }

            } else {
                 console.log('false', 'tule');
                return;
            }

        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser || {};
        },
        userRole() {
            return this.user.role;
        }
    },

}
</script>

<style scoped>
  .order-number {
    font-size: 20px;
    color: #333333;
  }
  .signature-container {
      border: 1px solid;
      padding: 5px;
  }
  .btn-undo {
      font-size: 9px;
      padding: 8px 5px;
      margin-top: 5px;
  }
</style>

<style lang="scss">

</style>