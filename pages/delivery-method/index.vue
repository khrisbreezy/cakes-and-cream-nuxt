<template>
    <section class="customer-dets customer-details booking-options">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="desk-layout">
                        <h1>Delivery Method</h1>
                        <form class="sign-in" @submit.prevent="saveOrder">
                            <div class="mb-5">
                                <label class="radio-wrapper">Pick Up
                                    <input v-model="$v.deliveryDetails.delivery_type.$model" type="radio" value="pickup"
                                        name="method">
                                    <span class="checkmark"></span>
                                    <template v-if="$v.deliveryDetails.delivery_type.$model === 'pickup' && order_type !== 'pre_order'">
                                        <label class="radio-wrapper radio-wrapper__inner">Now
                                            <input v-model="deliveryDetails.pickup_period" type="radio" value="now"
                                                name="pickup period">
                                            <span class="checkmark"></span>
                                        </label>

                                        <label class="radio-wrapper radio-wrapper__inner">Later
                                            <input v-model="deliveryDetails.pickup_period" type="radio" value="later"
                                                name="pickup period">
                                            <span class="checkmark"></span>
                                        </label>
                                    </template>
                                </label>
                                <label class="radio-wrapper">Home Delivery
                                    <input v-model="$v.deliveryDetails.delivery_type.$model" type="radio"
                                        value="home_delivery"
                                        name="method">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div>
                                <div class="d-flex">
                                    <div class="form-group">
                                        <label>First Name</label>
                                        <input v-model="$v.deliveryDetails.recipient_first_name.$model" type="text"
                                            required>
                                        <p class="error"
                                        v-if="!$v.deliveryDetails.recipient_first_name.required && $v.deliveryDetails.recipient_first_name.$dirty">
                                            Field is required.</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Last Name</label>
                                        <input v-model="$v.deliveryDetails.recipient_last_name.$model" type="text">
                                        <p class="error"
                                        v-if="!$v.deliveryDetails.recipient_last_name.required && $v.deliveryDetails.recipient_last_name.$dirty">
                                            Field is required.</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input v-model="$v.deliveryDetails.recipient_mobile_number.$model" type="number">
                                    <p class="error"
                                    v-if="!$v.deliveryDetails.recipient_mobile_number.required && $v.deliveryDetails.recipient_mobile_number.$dirty">
                                        Field is required.</p>
                                </div>
                                <div v-if="deliveryDetails.delivery_type === 'home_delivery'" class="form-group">
                                    <label>Delivery Address</label>
                                    <input v-model="$v.deliveryDetails.delivery_address.$model" type="text">
                                    <p class="error"
                                    v-if="!$v.deliveryDetails.delivery_address.required && $v.deliveryDetails.delivery_address.$dirty">
                                        Field is required.</p>
                                </div>
                                <div v-if="deliveryDetails.delivery_type === 'pickup' && deliveryDetails.pickup_period === 'later'" class="form-group">
                                    <label>Pickup Date</label>
                                    <input v-model="$v.deliveryDetails.pickup_date.$model" type="date">
                                    <p class="error"
                                    v-if="!$v.deliveryDetails.pickup_date.required && $v.deliveryDetails.pickup_date.$dirty">
                                        Field is required.</p>
                                </div>
                                <div v-if="deliveryDetails.delivery_type === 'pickup' && deliveryDetails.pickup_period === 'later'" class="form-group">
                                    <label>Pickup Time</label>
                                    <input v-model="$v.deliveryDetails.pickup_time.$model" type="time">
                                    <p class="error"
                                    v-if="!$v.deliveryDetails.pickup_time.required && $v.deliveryDetails.pickup_time.$dirty">
                                        Field is required.</p>
                                </div>

                                <template v-if="order_type === 'pre_order'">
                                    <div class="form-group">
                                        <label>Due Date</label>
                                        <input v-model="$v.deliveryDetails.delivery_date.$model" type="date">
                                        <p class="error"
                                        v-if="!$v.deliveryDetails.delivery_date.required && $v.deliveryDetails.delivery_date.$dirty">
                                            Field is required.</p>
                                    </div>

                                    <div class="form-group">
                                        <label>Due Time</label>
                                        <label class="radio-wrapper">Morning
                                            <input v-model="deliveryDetails.delivery_time" type="radio" value="morning"
                                                name="deliveryTime">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radio-wrapper">Afternoon
                                            <input v-model="deliveryDetails.delivery_time" type="radio" value="afternoon"
                                                name="deliveryTime">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radio-wrapper">Evening
                                            <input v-model="deliveryDetails.delivery_time" type="radio" value="evening"
                                                name="deliveryTime">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </template>


                                <div v-if="order_type === 'express_order' && deliveryDetails.delivery_type === 'home_delivery'" class="form-group">
                                    <label>Delivery Date</label>
                                    <input v-model="$v.deliveryDetails.delivery_date.$model" type="date">
                                    <p class="error"
                                    v-if="!$v.deliveryDetails.delivery_date.required && $v.deliveryDetails.delivery_date.$dirty">
                                        Field is required.</p>
                                </div>
                                <div v-if="order_type === 'express_order' && deliveryDetails.delivery_type === 'home_delivery'" class="form-group">
                                    <label>Delivery Time</label>
                                    <label class="radio-wrapper">Morning
                                        <input v-model="deliveryDetails.delivery_time" type="radio" value="morning"
                                            name="deliveryTime">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrapper">Afternoon
                                        <input v-model="deliveryDetails.delivery_time" type="radio" value="afternoon"
                                            name="deliveryTime">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrapper">Evening
                                        <input v-model="deliveryDetails.delivery_time" type="radio" value="evening"
                                            name="deliveryTime">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>

                                <div v-if="deliveryDetails.delivery_type === 'home_delivery'" class="form-group">
                                    <label>Delivery Notes</label>
                                    <textarea v-model="deliveryDetails.delivery_note" type="text"></textarea>
                                </div>
                            </div>
                            <div class="btn-row mt-0">
                                <button @click="$router.back()" class="btn btn-primary " type="button">Previous</button>
                                <button class="btn btn-loading" :disabled="$v.deliveryDetails.$anyError || loading" type="submit">
                                    {{ loading ? 'Saving' : 'Save' }}
                                    <BtnLoader v-if="loading"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import {deliveryDetailsValidators} from '../../helpers/Validators';
import BtnLoader from "../../components/BtnLoader";

export default {
    data: () => ({
        deliveryDetails: {
            recipient_first_name: '',
            recipient_last_name: '',
            recipient_mobile_number: '',
            delivery_address: '',
            pickup_date: '',
            pickup_time: '',
            delivery_date: '',
            delivery_time: 'morning',
            delivery_note: '',
            delivery_type: 'pickup',
            pickup_period: 'now'
        },
        order_type: '',
        order_medium: '',
        customerDetails: {},
        cakeDetails: {},
        additionalInfo: null,
        loading: false,
        popFiles: null
    }),
    validations: deliveryDetailsValidators,
    mounted() {
        // CSRF COOKIES
        this.$axios.$get('csrf-cookie');
        if (this.$cookies.get('customerDetails')) {
            let customerDetails = {...this.$cookies.get('customerDetails')};
            this.deliveryDetails = {
                ...this.deliveryDetails,
                ...customerDetails,
                recipient_first_name: customerDetails.customer_first_name,
                recipient_last_name: customerDetails.customer_last_name,
                recipient_mobile_number: customerDetails.customer_mobile_number
            };
        }
        this.order_type = this.$cookies.get('orderType');
        this.order_medium = this.$cookies.get('orderMedium');
        this.customerDetails = this.$cookies.get('customerDetails');
        this.cakeDetails = this.$cookies.get('cakeDetails');
        this.additionalInfo = this.$cookies.get('additionalInformation');
        this.popFiles = JSON.parse(localStorage.getItem('pop'));

        console.log(this.cakeDetails, 'cakeDetails');
    },
    components: {BtnLoader},
    middleware: ['order-complete'],
    methods: {
        async saveOrder() {
            this.loading = true;
            let orderDetails = {};
            orderDetails = {
                ...this.cakeDetails,
                ...this.deliveryDetails,
                ...this.customerDetails,
                ...this.additionalInfo,
                order_medium: this.order_medium,
                order_type: this.order_type,
                // cake_icing_flavor: this.cakeDetails.cake_icing_flavor.label,
                reason_for_cake: this.additionalInfo ? this.additionalInfo.reason_for_cake.value : this.cakeDetails.reason_for_cake.value,
                cake_variety: this.cakeDetails.varieties ? this.cakeDetails.varieties.map(x => x.label) : []
            };

            if (this.additionalInfo) {
                orderDetails['cake_icing_type'] = 1;
                // orderDetails['cake_icing_type'] = cakeDetails.cake_icing_type.value;
                orderDetails['cake_size'] = 3;
                orderDetails['cake_shape'] = this.cakeDetails.cake_shape.value;
                orderDetails['cake_type'] = this.cakeDetails.cake_type.value;
                orderDetails['cake_fondant_design'] = this.cakeDetails.fondant_design_other || this.cakeDetails.cake_fondant_design.value;

            } else {
                orderDetails['tag_number'] = this.cakeDetails.tag_number.value;
                // orderDetails['message_color'] = this.cakeDetails.message_color.map(x => x.value);
                // const messageColors = this.cakeDetails.message_color.map(x => x.value);
            }

            if (this.deliveryDetails.delivery_type === 'pickup') {
                if (this.order_type === 'express_order') {
                    delete orderDetails.delivery_date;
                }
                if (this.deliveryDetails.pickup_period === 'now') {
                    delete orderDetails.pickup_time;
                    delete orderDetails.pickup_date;
                }
            }

            if (this.deliveryDetails.delivery_type === 'home_delivery') {
                delete orderDetails.pickup_date;
                delete orderDetails.pickup_time;
                delete orderDetails.pickup_period;
            }

            const formData = new FormData();
            Object.keys(orderDetails).forEach(key => {
                const detail = orderDetails[key];
                if (Array.isArray(detail)) {
                    detail.forEach(d => formData.append(`${key}[]`, d.value));
                } else {
                    formData.append(key, orderDetails[key]);
                }
            });

            if (this.popFiles && this.popFiles.length !== 0) {
                this.popFiles.forEach(file => formData.append("printed_out_picture[]", file));
            }

            try {
                const {data: response} = await this.$axios.post('customer-service/order', formData);
                this.loading = false;
                this.$toast.success(response.message);

                // Remove all order details
                this.$cookies.remove('orderType');
                this.$cookies.remove('orderMedium');
                this.$cookies.remove('customerDetails');
                this.$cookies.remove('cakeDetails');
                this.$cookies.remove('additionalInformation');
                localStorage.removeItem('pop');

                this.$cookies.set('order-response', response.data);

                console.log(response.data);

                await this.$router.push(this.additionalInfo ?  '/dashboard' : `/order-summary/${response.data.id}`);
            } catch (e) {
                this.loading = false;
                this.$toast.error(e.response.data.message);
                console.log(e.response);
            }
        }
    }
}
</script>
