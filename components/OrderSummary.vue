<template>
    <section class="order-summary booking-options">
        <div class="container">
            <div class="row">
                <div class="col-12">
                <div class="order-sec">
                    <p class="order-number"><b>Order Number - {{orderDetails.order_no}}</b></p>
                    <p>{{ orderDetails.created_at_formatted }}</p>
                </div>
                </div>

                <div class="col-12 pr-3">
                    <p><b>Order details</b></p>
                    <table class="table order-summary__table">
                        <tbody>
                        <tr>
                        <td>Amount</td>
                        <td>₦{{ orderDetails.sub_total ? orderDetails.sub_total.toLocaleString() : '' }}</td>
                        </tr>

                        <tr>
                        <td>Tag Number</td>
                        <td>{{orderDetails.cake.tag_number}}</td>
                        </tr>

                        <tr>
                        <td>Shape</td>
                        <td>{{orderDetails.cake.shape}}</td>
                        </tr>

                        <tr>
                        <td>Size</td>
                        <td>{{orderDetails.cake.size}}</td>
                        </tr>

                        <tr class="">
                        <td>Subtotal</td>
                        <td>₦{{ orderDetails.sub_total ? orderDetails.sub_total.toLocaleString() : '' }}</td>
                        </tr>

                        <tr class="">
                        <td>Delivery fee</td>
                        <td>0.00</td>
                        </tr>

                        <tr class="">
                        <td>Discount</td>
                        <td>Nil</td>
                        </tr>

                        <tr class="b-t">
                        <td>Total</td>
                        <td>₦{{ orderDetails.sub_total ? orderDetails.sub_total.toLocaleString() : '' }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <!-- Customer Details -->
                    <template v-if="role !== 'collection officer'">
                        <p><b>Customer details</b></p>
                        <table class="table order-summary__table">
                            <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{{orderDetails.customer.first_name}} {{orderDetails.customer.last_name}}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{{orderDetails.customer.email}}</td>
                            </tr>

                            <tr>
                                <td>Phone Number</td>
                                <td>{{orderDetails.customer.mobile_number}}</td>
                            </tr>
                            </tbody>
                        </table>

                        <!-- Delivery -->
                        <div v-if="orderDetails.delivery.delivery_type === 'home_delivery'">
                            <p v-if="orderDetails.delivery.delivery_type === 'home_delivery'"><b>Delivery details</b></p>
                            <table v-if="orderDetails.delivery.delivery_type === 'home_delivery'" class="table table-borderless order-summary__table">
                                <tbody>
                                <tr>
                                    <td>First name</td>
                                    <td>{{orderDetails.delivery.recipient_first_name}}</td>
                                </tr>
                                <tr>
                                    <td>Last name</td>
                                    <td>{{orderDetails.delivery.recipient_last_name}}</td>
                                </tr>
                                <tr>
                                    <td>Phone no</td>
                                    <td>{{orderDetails.delivery.recipient_mobile_number}}</td>
                                </tr>
                                <tr>
                                    <td>Shipping to</td>
                                    <td>{{orderDetails.delivery.delivery_address}}</td>
                                </tr>

                                <tr>
                                    <td>Date</td>
                                    <td>{{orderDetails.delivery.delivery_date}}</td>
                                </tr>

                                <tr>
                                    <td>Time</td>
                                    <td>{{orderDetails.delivery.delivery_time}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>

                    <table v-else class="table table-borderless order-summary__table">
                        <tbody>
                        <tr>
                            <td>Payment Method:</td>
                            <td>{{orderDetails.payment[0].payment_method.toUpperCase()}}</td>
                        </tr>
                        <tr>
                            <td>Order Status:</td>
                            <td>Ready for delivery</td>
                        </tr>
                        <tr>
                            <td>Order Details</td>
                            <td>{{orderDetails.delivery.delivery_note}}</td>
                        </tr>
                        <tr>
                            <td>Shipping to</td>
                            <td>{{orderDetails.delivery.delivery_address}}</td>
                        </tr>

                        <tr>
                            <td>Date</td>
                            <td>{{orderDetails.delivery.delivery_date}}</td>
                        </tr>

                        <tr>
                            <td>Time</td>
                            <td>{{orderDetails.delivery.delivery_time}}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["orderDetails"],
    computed: {
        role() {
            return this.$store.getters['getUser'].role;
        }
    }
}
</script>
