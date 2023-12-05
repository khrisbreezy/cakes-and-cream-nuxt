<template>
    <div>
        <section class="customer-care data-sorting">
            <div class="container">
                <div class="row accordion-wrap">
                    <OrderSortRow 
                    :date="date"
                    @dateChanged="dateChangeHandler"
                    :cancel-count="cancelCount"
                    @searchClosed="cancelSearch" 
                    @onSearchEntered="searchHandler" />

                    <div class="col-12">
                        <div v-if="loading" class="text-center loader-for-orders">
                            <Loader v-if="loading"/>
                        </div>
                       <div class="d-flex justify-content-between mt-4" v-if="showSearch">
                            <div class="d-flex">
                                <p class="my-auto pr-2 dashborad-head-txt">Search Orders</p>
                                <img src="~assets/images/search.svg" alt=""/>
                            </div>

                            <div>
                                <a @click.prevent="cancelSearch" href="#">Cancel Search</a>
                            </div>
                        </div>
                        <template v-if="!showSearch">
                            <h1 v-if="orders.length === 0 && !loading">No Orders</h1>
                            <div class="accordion" id="accordionExample">
                                <Orders :activeClass="order.payment_status" v-for="(order, index) in orders" :key="order.id"
                                        :order-index="index" :accordionId="order.id" :order="order"/>
                            </div>
                            <pagination 
                                :order-link="getOrderLink()" 
                                :order-meta="orderMeta" 
                                @onPaginationEvent="loadPage"
                                @pageLoading="data => loading = data"
                                />
                        </template>

                        <div class="col-12" v-else>
                            <div class="row" mt-5>
                                <div class="col-12">
                                    <!-- Search Orders -->
                                    <div>
                                        <!-- Orders List -->
                                        <div>
                                            <Orders :activeClass="order.payment_status" v-for="order in searchOrders" :key="order.id" :accordionId="order.id" :order="order" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Orders from '../../components/Orders';
import Loader from '../../components/Loader';
import {orderLink} from "../../helpers/Orders";
import OrderSortRow from '../../components/OrderSortRow';
import Pagination from '../../components/Pagination.vue';

export default {
    data: () => ({
        userType: '',
        orders: [],
        orderMeta: {},
        showSearchBar: false,
        showSearch: false,
         searchOrders: [],
        cancelCount: 0,
        loading: false,
        perPage: 10,
        todayDate: '',
        date: '',
    }),
    components: {Orders, Loader, OrderSortRow, Pagination},
    created() {
        this.getTodayDate();
        
    },
    mounted() {
        //Fetch userType
        this.userType = this.$cookies.get('userType');

        this.fetchOrders();
    },
    methods: {

        // Search orders
        async searchHandler(searchString) {
            if (!searchString) return;
            this.showSearch = true;
            this.loading = true;
            try {
                const urlEncoded = this.encodeUrl(searchString)
                const {data: {data}} = await this.$axios.get(`order/search?searchString=${urlEncoded}`);
                this.searchOrders = data;
                this.loading = false;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        },

        cancelSearch() {
            this.searchOrders = [];
            this.cancelCount += 1;
            this.showSearch = false;
        },

        encodeUrl(url) {
            if (url.includes('#')) {
                return `%23${url.split('#')[1]}`
            }
            return url;
        },

        getTodayDate() {
            this.date = new Date();
            this.todayDate = this.formatDate(this.date);
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

        // Fetch order on date change
        async dateChangeHandler(date) {
            this.todayDate = date;
            this.orders = [];
            try {
                    if (this.userRole === 'customer service') {
                        const {data: {data : {all_orders}}} = await this.fetchOrdersApi();
                        this.orders = all_orders.orders;
                        this.orderMeta = all_orders.pagination;
                    } else {
                        const {data: {data : {orders, pagination}}} = await this.fetchOrdersApi();
                        this.orders = orders;
                        this.orderMeta = pagination;
                    }
                } catch (e) {
                    console.log(e);
                }
        },

        async fetchOrdersApi() {
            this.loading = true;
            // Function to return a new promise of the endpoint fetch dashboard orders
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await this.$axios.get(this.getOrderLink());
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

        async fetchOrders() {
            try {
                if (this.userRole === 'customer service') {
                    const {data: {data : {all_orders}}} = await this.fetchOrdersApi();
                    this.orders = all_orders.orders;
                    this.orderMeta = all_orders.pagination;
                    this.loading = false;
                } else {
                    const {data: {data : {orders, pagination}}} = await this.fetchOrdersApi();
                    this.orders = orders;
                    this.orderMeta = pagination;
                }  
            } catch (e) {
               console.log(e);
            }

        },

        // Testing for each department to call the filter endpoint
        orderLink(userRole, perPage, date) {
            switch(userRole) {
                case 'customer service':
                    return `customer-service/dashboard?date=${date}&perPage=${perPage}`;
                case 'cashier':
                    return `cashier/dashboard/get-daily-orders?date=${date}&perPage=${perPage}`;
                case 'message writer':
                   return `message-writer/dashboard/get-today-paid-orders?date=${date}&perPage=${this.perPage}`;
                case 'message writer admin':
                   return `message-writer/admin/dashboard/get-paid-orders?date=${date}&perPage=${this.perPage}`
                case 'collection officer':
                   return `collection-officer/dashboard/get-completed-assigned-orders?date=${date}&perPage=${this.perPage}`
                default:
                    return ``;
            }
        },

        getOrderLink() {
            return this.orderLink(this.userRole, this.perPage, this.todayDate);
        },
        async loadPage(event) {
            const {data: {orders, pagination}} = event;
            this.orders = orders;
            this.orderMeta = pagination;
            this.loading = false;
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
};
</script>


<style lang="scss">
.openBtn {
    margin-bottom: 10px;
}

.pagination {
    .page-item {
        margin-left: 20px;

        a {
            text-decoration: none;
        }
    }
}

.loader-for-orders {
    margin: 10px 0 0;
}
</style>
