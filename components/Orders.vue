<template>
    <div class="col-12 border-top">
        <div class="accordion" id="accordionExample">
            <div class="item">
                <div class="item-header">
                    <div class="accordion-head">
                        <button
                            class="accord-btn"
                            :class="{collapsed: orderIndex > 0}"
                            type="button"
                            data-toggle="collapse"
                            :data-target="`#collapseOne${accordionId}`"
                            :aria-controls="`collapseOne${accordionId}`"
                        >
                            <span :class="activeClass.split(' ').join('-')" class="acc-arr">
                                <img
                                    class="img-fluid"
                                    src="~assets/images/arrow-up.svg"
                                    alt=""
                                />
                            </span>
                            <p class="accordion-p">Order {{ order.order_no }}</p>
                        </button>
                    </div>
                </div>

                <div :id="`collapseOne${accordionId}`" class="collapse" :class="{show: orderIndex === 0}" data-parent="#accordionExample">
                    <div class="accordion-text">
                        <table class="table table-borderless">
                            <!-- Customer Service / Cashier-->
                            <tbody v-if="user.role === 'cashier' || user.role === 'customer service'">
                                <tr>
                                    <td>
                                        <p>Order Type</p>
                                    </td>
                                    <td>
                                        <p>{{order.type === 'express_order' ? 'Express Order' : 'Pre Order'}}</p>
                                    </td>
                                </tr>

                                <tr v-if="order.type !== 'pre_order' && order.cake">
                                    <td>
                                        <p>Tag Number</p>
                                    </td>
                                    <td>
                                        <p>{{ order.cake.tag_number }}</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>Phone Number</p>
                                    </td>
                                    <td>
                                        <p><a :href="`tel:${order.customer.mobile_number}`">{{
                                                order.customer.mobile_number
                                            }}</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Customer Name</p>
                                    </td>
                                    <td>
                                        <p>{{ order.customer.first_name }} {{ order.customer.last_name }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Gross Amount</p>
                                    </td>
                                    <td>
                                        <p>₦{{ order.sub_total.toLocaleString() }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Payment Status</p>
                                    </td>
                                    <td>
                                        <p>{{ order.payment_status }}</p>
                                    </td>
                                </tr>
                                <tr v-if="user.role === 'cashier'">
                                    <td>
                                        <p>Action</p>
                                    </td>
                                    <td>
                                        <div class="edit">
                                            <span class="edit-img">
                                                <img src="~assets/images/edit.svg" alt=""/>
                                            </span>
                                            <a @click="pay(order)" class="lack">Edit</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <!-- Message Writer -->
                            <tbody v-else-if="user.role === 'message writer admin' || user.role === 'message writer'">
                                <tr>
                                    <td>
                                        <p>Order Type</p>
                                    </td>
                                    <td>
                                       <p>{{order.type === 'express_order' ? 'Express Order' : 'Pre Order'}}</p>
                                    </td>
                                </tr>

                                <tr v-if="order.type !== 'pre_order' && order.cake">
                                    <td>
                                        <p>Tag Number</p>
                                    </td>
                                    <td>
                                        <p>{{ order.cake.tag_number }}</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>Message Color</p>
                                    </td>
                                    <td>
                                        <p>{{ order.cake.icing_color_of_message }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Message On Cake</p>
                                    </td>
                                    <td>
                                        <p>{{ order.cake.message_on_cake }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Payment Status</p>
                                    </td>
                                    <td>
                                        <p>{{ order.payment_status === 'paid' ? 'Payment Complete' : 'Pending' }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Writing Status</p>
                                    </td>
                                    <td v-if="user.role === 'message writer admin'">
                                        <p>{{
                                                order.message_writer ? (order.message_writer.completed_at ? 'Completed' : 'Pending') : 'Pending'
                                            }}</p>
                                    </td>
                                    <td v-else>
                                        <label for="pending">
                                            <input id="pending" type="radio" :name="`writing-status-${order.id}`"
                                                value="pending" v-model="writing_status.status"/>
                                            Pending
                                        </label>

                                        <label for="completed">
                                            <input id="completed" type="radio" :name="`writing-status-${order.id}`"
                                                value="completed" v-model="writing_status.status"/>
                                            Completed
                                        </label>

                                        <br>

                                        <button class="btn btn-loading btn-sm" :disabled="loading"
                                                @click="changeStatus(order.message_writer.id)">
                                            {{ loading ? '' : 'Update' }}
                                            <BtnLoader v-if="loading"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                             <!-- Colllection Officer -->
                             <!-- Change to Collection -->
                             <!-- <p><b>Collection</b></p> -->
                            <tbody v-if="user.role === 'collection officer' || user.role === 'logistics'">
                                <tr>
                                    <td>
                                        <p>Order Type</p>
                                    </td>
                                    <td>
                                       <p>{{order.type === 'express_order' ? 'Express Order' : 'Pre Order'}}</p>
                                    </td>
                                </tr>

                                <tr v-if="order.type !== 'pre_order' && order.cake">
                                    <td>
                                        <p>Tag Number</p>
                                    </td>
                                    <td>
                                        <p>{{ order.cake.tag_number }}</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>Phone Number</p>
                                    </td>
                                    <td>
                                        <p><a :href="`tel:${order.customer.mobile_number}`">{{
                                                order.customer.mobile_number
                                            }}</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Customer Name</p>
                                    </td>
                                    <td>
                                        <p>{{ order.customer.first_name }} {{ order.customer.last_name }}</p>
                                    </td>
                                </tr>
                                <tr v-if="order.delivery">
                                    <td>
                                        <p>Order Status</p>
                                    </td>
                                    <td v-if="order.order_status === 'completed'">
                                        <p>Completed</p>
                                    </td>
                                    <td v-else>
                                        <p>{{ order.delivery.delivery_type === 'home_delivery' ? 'Ready for delivery' : 'Ready for pickup' }}</p>
                                    </td>
                                </tr>
                                 <tr>
                                    <td>
                                        <p>Writer's Status</p>
                                    </td>
                                    <td>
                                        <p>Completed</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Payment Status</p>
                                    </td>
                                    <td>
                                        <p>{{ order.payment_status }}</p>
                                    </td>
                                </tr>
                                <tr v-if="order.delivery">
                                    <td>
                                        <p>Action</p>
                                    </td>
                                    <td>
                                        <div class="edit">
                                            <span class="edit-img">
                                                <img src="~assets/images/edit.svg" alt=""/>
                                            </span>
                                            <a v-if="order.delivery.delivery_type === 'home_delivery'" @click="assignToRider(order)" class="lack">Assign to Rider</a>
                                            <a v-else @click="gotoCollection" class="lack">Edit</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BtnLoader from "./BtnLoader";

export default {
    components: {BtnLoader},
    props: ["activeClass", "accordionId", "order", "orderIndex", "openTab"],
    data: () => ({
        writing_status: {
            status: 'pending'
        },
        loading: false,
    }),
    created() {
        if (this.order.message_writer) {
            this.writing_status.status = this.order.message_writer.completed_at ? 'completed' : 'pending';
        }
    },
    methods: {
        pay(order) {
            console.log(order);
            this.$cookies.set('order-response', order);
            this.$router.push(`/orders/payment/${order.id}`);
        },
        gotoCollection() {
            this.$cookies.set('order-response', this.order);
            this.$router.push('/orders/order-collection');
        },
        assignToRider(order) {
            this.$cookies.set('order-response', order);
            this.$router.push(`/orders/${order.id}/assign-to-dispatch`);
        },
        async changeStatus(id) {
            this.loading = true;
            try {
                const {data: {message}} = await this.$axios.put(`message-writer/update-writing-status/${id}`, {status: this.writing_status.status === 'pending' ? 1 : 2});
                this.$toast.success(message);
                this.loading = false;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser || {};
        }
    },
}
</script>

<style>
.btn-sm {
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
