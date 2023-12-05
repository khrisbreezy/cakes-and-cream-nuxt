<template>
    <div>
        <section class="d-sm-none d-blcok customer-care data-sorting">
            <div class="container">
                <div class="row accordion-wrap">
                    <div class="col-12">
                        <div class="col-12">
                            <h1>Bookings To Do</h1>
                        </div>
                        <div class="row">
                        <div class="col-12">
                                <div v-if="loading" class="text-center loader-for-orders">
                                    <Loader v-if="loading"/>
                                </div>
                                <!-- <h1 v-if="orders.length === 0">No Orders</h1> -->
                            </div>
                        </div>
                        <div v-for="(allOrder, index) in orders" :key="index" class="mb-5">
                            <div class="sort-head">
                                <div class="date">
                                    <p class="day-num">{{ fetchDate(allOrder[0].due_date) }}</p>
                                    <span>
                                        <p class="day">{{ fetchWeek(allOrder[0].due_date) }}</p>
                                        <p class="year">{{  fetchMonth(allOrder[0].due_date) }} {{ fetchYear(allOrder[0].due_date)  }}</p>
                                    </span>
                                </div>
                            </div>
                            <div class="row pt-3 align-items-center">
                                <div class="col-12">
                                    <p class="mb-0">Pre-orders</p>
                                </div>
                            </div>
                            <BookingOrders :todoTab="true" v-for="order in allOrder" :key="order.id" :order="order" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import BookingOrders from '../../components/BookingOrders';
import Loader from '../../components/Loader';
import {convertObjectToArray} from '../../helpers/ConvertObjectToArray';

export default {
    data: () => ({
        orders: [],
        month: "",
        week: "",
        year: "",
        currentDate: "",
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sept", "Oct", "Nov", "Dec"],
        weekNames: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
        loading: false
    }),
    components: {BookingOrders, Loader},
    created() {
        this.fetchTodoOrders();
    },
    mounted() {
       
    },
    methods: {
        async fetchTodoOrders() {
            this.loading = true;
            try {
                const {data: {data}} = await this.$axios.get(`production-manager/dashboard/todo-orders`);
                const orders = convertObjectToArray(data);
                this.orders = orders;
                console.log({orders});
                this.loading = false;
            } catch(e) {
                console.log(e);
                this.loading = false;
            }
        },
        fetchDate(date) { 
            const d = new Date(date);
            // this.month = this.monthNames[d.getMonth()];
            // this.week = this.weekNames[d.getDay()];
            // this.year = d.getFullYear();
            return d.getDate();
        },
        fetchMonth(date) { 
            const d = new Date(date);
            return this.monthNames[d.getMonth()];
            this.week = this.weekNames[d.getDay()];
            this.year = d.getFullYear();
            this.currentDate = d.getDate();
        },
        fetchYear(date) { 
            const d = new Date(date);
            // this.month = this.monthNames[d.getMonth()];
            // this.week = this.weekNames[d.getDay()];
            return d.getFullYear();
            this.currentDate = d.getDate();
        },
        fetchWeek(date) { 
            const d = new Date(date);
            // this.month = this.monthNames[d.getMonth()];
            return this.weekNames[d.getDay()];
            this.year = d.getFullYear();
            this.currentDate = d.getDate();
        },
    }


}
</script>