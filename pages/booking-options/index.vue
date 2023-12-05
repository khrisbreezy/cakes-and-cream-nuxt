<template>
    <div>
        <section class="booking-options">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="desk-layout">
                            <form action="#">
                                <div class="mb-5">
                                    <h1>Order Type</h1>
                                    <p class="type-1">Please select the order type</p>

                                    <label class="radio-wrapper">Express Order
                                        <input v-model="orderType" value="express_order" type="radio" name="order-type" @change="onOrderTypeChange">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">Pre-order
                                        <input v-model="orderType" value="pre_order" type="radio" name="order-type" @change="onOrderTypeChange">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">Delivery Order
                                        <input v-model="orderType" value="delivery_order" type="radio" name="order-type" @change="onOrderTypeChange">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </form>

                            <form>
                                <div>
                                    <h1 class="text-center">Order Medium</h1>
                                    <p class="type-1">Please select order medium</p>

                                    <label class="radio-wrapper">Walk In
                                        <input v-model="orderMedium" value="Walk In" type="radio" name="order-medium">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">Phone Call/Text
                                        <input v-model="orderMedium" value="Phone Call/Text" type="radio"  name="order-medium">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">Website
                                        <input v-model="orderMedium" value="Website" type="radio" name="order-medium">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">Instagram/Twitter/Facebook
                                        <input v-model="orderMedium" value="Instagram/Twitter/Facebook" type="radio" name="order-medium">
                                        <span class="checkmark"></span>
                                    </label>

                                    <label class="radio-wrapper">WhatsApp
                                        <input v-model="orderMedium" value="Whatsapp" type="radio" name="order-medium">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </form>

                            <div class="btn-row justify-content-end">
                                <button @click="OrderTypeHandler" class="btn float-right">Next</button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Header from '../../components/Header';

    export default {
        data: () => ({
            orderType: 'express_order',
            orderMedium: 'Walk In'
        }),
        created() {
            this.$cookies.remove('order-response');
        },
        components: {Header},
        methods: {
            OrderTypeHandler() {
                this.$cookies.set('orderType', this.orderType);
                this.$cookies.set('orderMedium', this.orderMedium);
                this.$router.push('/customer-details');
            },
            onOrderTypeChange() {
              this.$cookies.remove('additionalInformation');
              this.$cookies.remove('cakeDetails');
            }
        }
    }
</script>

<style>


</style>
