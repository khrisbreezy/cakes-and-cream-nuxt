<template>
    <div>
        <section class="customer-care data-sorting">
            <div class="container">
                <div class="row accordion-wrap">
                    <div class="col-12">
                        <h1>Bookings</h1>
                    </div>
                    <OrderSortRow 
                        :date="date"
                        @dateChanged="dateChangeHandler"  />
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-between mt-4">
                            <p>&nbsp;</p>

                            <div>
                                <a @click.prevent="$router.push('/todo-orders')" href="#">View todo orders</a>
                            </div>
                        </div>
                </div>
                <div class="row pt-3 align-items-center">
                    <div class="col-2">
                        <p class="mb-0">Time</p>
                    </div>
                    <div class="col-8">
                        <p class="mb-0">Pre-orders</p>
                    </div>
                    <div class="col-2 d-flex">
                        <img class="sort-icon" src="~assets/images/sort-icon.svg" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div v-if="loading" class="text-center loader-for-orders">
                            <Loader v-if="loading"/>
                        </div>
                        <h1 v-if="orders.length === 0">No Orders</h1>
                    </div>
                </div>
                <BookingOrders :todoTab="false" :order="order" v-for="order in orders" :key="order.id" />
            </div>
        </section>
    </div>
</template>
  
<script>
import OrderSortRow from "../../components/OrderSortRow";
import BookingOrders from '../../components/BookingOrders';
import Loader from '../../components/Loader';

export default {    

    data: () => ({
        date: '',
        todayDate: '',
        loading: false,
        orders: [],
    }),
    components: {OrderSortRow, BookingOrders, Loader},
    created() {
        this.getTodayDate();
        this.fetchPreOrders();
    },
    methods: {
        getTodayDate() {
            this.date = new Date();
            this.todayDate = this.formatDate(this.date);
        }, 
        // Fetch PreOrder Api
        async getPreOrderApi(date) {
            this.loading = true;
            this.orders = [];
            // Function to return a new promise of the endpoint fetch dashboard orders
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await this.$axios.get(`production-manager/dashboard/orders?date=${date}`);
                    this.loading = false;
                    // Resolve(new promise)
                    resolve(result);
                } catch (error) {
                     // Reject(new promise)
                    reject(error);
                    this.loading = false;
                }
            })
        },
        async fetchPreOrders() {
            try {
                const {data : {data: data}} = await this.getPreOrderApi(this.todayDate);
                this.orders = data;
            } catch(e) {
                console.log(e);
            }
        },
        // Fetch order on date change
        async dateChangeHandler(date) {
            this.todayDate = date;
            try {
                    const {data : {data: data}} = await this.getPreOrderApi(date);
                    this.orders = data;
                } catch (e) {
                    console.log(e);
                }
        },
        formatDate(d) {
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
    }
   
};
</script>

<style>
.sort-icon {
    margin: 0 auto;
}
</style>
