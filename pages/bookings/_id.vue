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
                        <h1>Booking Summary</h1>
                    </div>
                    <div class="col-12">
                        <p class="text-center order-number">Order {{order.order_no}}</p>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="row">
                            <div class="col-6 mb-4">
                                <p>Customer Details</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>{{order.customer.first_name}} {{order.customer.last_name}}</p> 
                                <p class="faded-text">{{order.customer.mobile_number}}</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Message on Cake</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>{{order.cake.message_on_cake}}</p> 
                            </div>
                            <div class="col-6 mb-4">
                                <p>Type of Cake/Icing</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Coconut</p> 
                                <p>Butter</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Cake Design</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Roses</p> 
                            </div>
                             <div class="col-6 mb-4">
                                <p>Icing Flavour</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>{{order.cake.icing_flavor}}</p> 
                            </div>
                             <div class="col-6 mb-4">
                                <p>Icing Type</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>{{order.cake.icing_type}}</p> 
                            </div>
                            <div class="col-6 mb-4">
                                <p>Extras</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Oreos</p> 
                            </div>
                            <div class="col-6 mb-4">
                                <p>Message Color</p>
                            </div>
                            <div class="col-6 mb-4">
                                <div class="d-flex">
                                    <p v-for="(messageColor, index) in order.cake.message_color" :key="index" class="mr-1">{{messageColor}}</p>
                                </div>
                            </div>
                            <div class="col-6 d-flex align-items-center mb-4">
                                <p>Task Status</p>
                            </div>
                            <template>
                                <div v-if="order.task_status === 'not assigned'" class="col-6 mb-4">
                                    <div class="task-container-status-red">
                                        <div class="d-flex align-items-center">
                                            <img src="~assets/images/red-dot.svg" alt="">
                                            <p class="task-assigned task-assigned-red">Not Assigned</p> 
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="col-6 mb-4">
                                    <div class="task-container-status">
                                        <div class="d-flex align-items-center">
                                            <img src="~assets/images/green-dot.svg" alt="">
                                            <p class="task-assigned">Assigned</p> 
                                        </div>
                                    </div>
                                </div>

                            </template>
                            <!-- <div class="col-6 mb-4">
                                <p>Staff Assigned</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>Erin Levin</p> 
                                <p class="faded-text">102</p>
                            </div> -->
                            <div class="col-6 mb-4">
                                <p>Number of Layers</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>2</p> 
                            </div>
                            <div class="col-6 mb-4">
                                <p>Due Date</p>
                            </div>
                            <div class="col-6 mb-4">
                                <p>{{currentDate}} {{month}}, {{year}}</p> 
                            </div>
                            <div class="col-6 mb-4">
                                <p>Production Status</p>
                            </div>
                            <div class="col-6 mb-4">
                            <label class="mb-3" for="pending">
                                    <input id="pending" type="radio" :name="`booking-summary-89`"
                                        value="pending" v-model="production_status.status" />
                                    Pending
                                </label> <br/>

                                <label for="completed">
                                    <input id="completed" type="radio" :name="`booking-summary-89`"
                                        value="completed" v-model="production_status.status"/>
                                    Completed
                                </label>
                            </div>
                        </div>

                        <button @click="assignBookings(order)" class="btn w-100">
                            Assign order to staffs
                        </button>

                        <div class="btn-row">
                            <button @click="$router.back()" class="btn" type="button">Cancel</button>
                            <button @click="changeStatus(order.id)" class="btn" type="submit">
                                 {{ btnLoading ? 'Saving' : 'Save' }}
                                    <BtnLoader v-if="btnLoading"/>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
 import Loader from '../../components/Loader';
 import BtnLoader from '../../components/BtnLoader';

export default {
    data: () => ({
        production_status: {
            status: ''
        },
        order: {},
        year: "",
        currentDate: "",
        month: "",
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sept", "Oct", "Nov", "Dec"],
        loading: false,
        btnLoading: false
    }),
    components: {Loader, BtnLoader},
    created() {
        this.fetchSingleorder();
    },
    mounted() {
        if (this.$cookies.get('order-response')) {
            this.order = this.$cookies.get('order-response');
        };
        this.getOrderDueDate();
    },
    methods: {
        getOrderDueDate() {
            const d = new Date(this.order.due_date);
            this.month = this.monthNames[d.getMonth()];
            this.currentDate = d.getDate();
            this.year = d.getFullYear();
        },
        async fetchSingleorder() {
            this.loading = true;
            try {
                const {data: {data}} = await this.$axios.get(`production-manager/orders/${this.$route.params.id}`);
                console.log({data});
                this.order = data;
                this.production_status.status = data.production_status;
                this.loading = false;
            } catch(e) {
                console.log(e);
                this.loading = false;
            } 
        },
        assignBookings(order) {
            this.$cookies.set('order-response', order);
            this.$router.push(`/bookings/assign-bookings/${order.id}`);
        },
        async changeStatus(id) {
            if (this.order.staffs_assigned.length === 0) {
                console.log('here');
                this.$toast.error('Kindly assign order to staffs before completing.');
                return;
            } else {
                this.btnLoading = true;
                try {
                    const {data : {message}} = await this.$axios.post(`production-manager/orders/${id}/update-production-status`, {status: this.production_status.status === 'pending' ? 1 : 2});
                    this.$toast.success(message);
                    this.btnLoading = false;
                } catch(e) {
                    console.log(e);
                    this.btnLoading = false;
                }
            }
        }
    }
}
</script>

<style >
.faded-text {
    color: #6B6B6B;
}
</style>