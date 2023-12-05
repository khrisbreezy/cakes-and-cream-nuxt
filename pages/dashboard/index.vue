<template>
    <div>
        <section class="d-sm-none d-blcok customer-care data-sorting">
            <div class="container">
                <div class="row accordion-wrap">
                    <OrderSortRow
                     @dateChanged="dateChangeHandler" 
                     @onSearchEntered="searchHandler" 
                     @searchClosed="cancelSearch" 
                     :cancel-count="cancelCount"
                     :date="date"
                     />

                    <div class="col-12">
                        <div class="d-flex justify-content-between mt-4" v-if="!showSearch">
                            <div class="d-flex">
                                <p class="my-auto pr-2 dashborad-head-txt">{{ headerIcon().text }}</p>
                                <img :src="headerIcon().image" alt=""/>
                            </div>

                            <div>
                                <a v-if="displayOnlyAllTab" @click.prevent="$router.push('/orders')" href="#">View all</a>
                                <a v-else @click.prevent="goToDashboard" href="#">Back to today</a>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between mt-4" v-else>
                            <div class="d-flex">
                                <p class="my-auto pr-2 dashborad-head-txt">Search Orders</p>
                                <img src="~assets/images/search.svg" alt=""/>
                            </div>

                            <div>
                                <a @click.prevent="cancelSearch" href="#">Cancel Search</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div v-if="loading" class="text-center loader-for-orders">
                            <Loader v-if="loading"/>
                        </div>
                    </div>

                    <template v-if="!showSearch">
                        <div class="col-12 mt-3">
                            <div class="row">
                                <!-- All orders -->
                                <div :class="[(userRole === 'customer service' || !displayOnlyAllTab) ? 'col-12' : 'col-6']">
                                    <div @click.stop="showOrders"
                                        class="a-orders"
                                        data-toggle="collapse"
                                        data-target="#allOrders"
                                        aria-controls="collapseOne"
                                        
                                        :class="[(userRole === 'customer service' || !displayOnlyAllTab) ? 'aOrdersCustomerService': '']"
                                    >
                                        <div class="row justify-content-between align-items-center">
                                            <div class="col-4">
                                                <div class="ico1" :class="[(userRole === 'customer service' || !displayOnlyAllTab) ? 'ico-customer-service' : '']">
                                                    <img :src="headerIcon().allIcon.image" class="day-num" :class="[(userRole === 'customer service' || !displayOnlyAllTab) ? 'img-customer-service' : '']"/>
                                                </div>
                                            </div>

                                            <div class="col-8">
                                                <div class="dash-rating">
                                                    <p :class="[(userRole === 'customer service' || !displayOnlyAllTab) ? 'text-customer-service' : '']">{{allPaginations.total || 0}}</p>
                                                    <p>{{headerIcon().allIcon.text}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="displayOnlyAllTab">
                                    <!-- Pending Order -->
                                    <div class="col-6" v-if="userRole !== 'customer service'">
                                        <div @click.stop="showPending"
                                            class="p-orders"
                                            data-toggle="collapse"
                                            data-target="#pendingOrders"
                                            aria-controls="collapseOne"
                                        >
                                            <div class="row justify-content-between align-items-center">
                                                <div class="col-4">
                                                    <div class="ico2">
                                                        <img :src="headerIcon().pendingIcon.image" class="day-num"/>
                                                    </div>
                                                </div>

                                                <div class="col-8">
                                                    <div class="dash-rating">
                                                        <p>{{pendingPaginations.total || 0}}</p>
                                                        <p>{{headerIcon().pendingIcon.text}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <template v-if="displayOnlyAllTab">
                                <div class="row mt-3">
                                    <!-- Ongoing Orders -->
                                    <div class="col-6" v-if="userRole !== 'customer service' && userRole !== 'message writer' && userRole !== 'collection officer'">
                                        <div @click.stop="showOngoing"
                                            class="o-orders"
                                            data-toggle="collapse"
                                            data-target="#ongoingOrders"
                                            aria-controls="collapseOne"
                                        >
                                            <div class="row justify-content-between align-items-center">
                                                <div class="col-4">
                                                    <div class="ico2">
                                                        <img :src="headerIcon().ongoingIcon.image" class="day-num"/>
                                                    </div>
                                                </div>

                                                <div class="col-8">
                                                    <div class="dash-rating">
                                                        <p>{{outstandingPaginations.total || 0}}</p>
                                                        <p>{{headerIcon().ongoingIcon.text}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Assigned Orders -->
                                    <div class="col-6" v-if="userRole === 'collection officer'">
                                        <div @click.stop="showOngoing"
                                            class="o-orders"
                                            data-toggle="collapse"
                                            data-target="#ongoingOrders"
                                            aria-controls="collapseOne"
                                        >
                                            <div class="row justify-content-between align-items-center">
                                                <div class="col-4">
                                                    <div class="ico2">
                                                        <img :src="headerIcon().ongoingIcon.image" class="day-num"/>
                                                    </div>
                                                </div>

                                                <div class="col-8">
                                                    <div class="dash-rating">
                                                        <p>{{outstandingPaginations.total || 0}}</p>
                                                        <p>{{headerIcon().ongoingIcon.text}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Completed Orders -->
                                    <div class="col-6" v-if="userRole !== 'customer service' && userRole !== 'message writer admin'">
                                        <div @click.stop="showComplete"
                                            class="c-orders"
                                            data-toggle="collapse"
                                            data-target="#completeOrders"
                                            aria-controls="collapseOne"
                                        >
                                            <div class="row justify-content-between align-items-center">
                                                <div class="col-4">
                                                    <div class="ico3">
                                                        <img :src="headerIcon().completedIcon.image" class="day-num"/>
                                                    </div>
                                                </div>

                                                <div class="col-8">
                                                    <div class="dash-rating">
                                                        <p>{{completedPaginations.total || 0}}</p>
                                                        <p>{{headerIcon().completedIcon.text}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div class="col-12">
                            <div class="row" mt-5>
                                <template v-if="displayOnlyAllTab">
                                    <div class="col-12" v-if="currentTab === 'pending'">
                                        <!-- PENDING ORDERS -->
                                        <div class="collapse" :class="{show: currentTab === 'pending'}" id="pendingOrders">
                                            <div class="d-flex mb-3">
                                                <p class="mt-3 pr-2"><b>{{headerIcon().dropDownText.pending}}</b></p>
                                                <!-- <img src="~assets/images/warning.svg" alt=""/> -->
                                            </div>
                                            <!-- Orders List -->
                                            <h1 v-if="pendingOrders.length === 0">No orders</h1>
                                            <div id="accordionExample">
                                                <Orders :activeClass="order.payment_status" v-for="order in pendingOrders" :key="order.id" :accordionId="order.id" :order="order" />
                                                <pagination
                                                    :order-link="orderLink()"
                                                    :order-meta="pendingPaginations"
                                                    @onPaginationEvent="loadPage"
                                                    @pageLoading="data => loading = data"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <!-- ALL ORDERS -->
                                <div class="col-12" v-if="currentTab === 'all'">
                                    <div class="collapse" :class="{show: currentTab === 'all'}" id="allOrders">
                                        <div class="d-flex mb-3">
                                            <p class="mt-3 pr-2"><b>{{headerIcon().dropDownText.all}}</b></p>
                                            <!-- <img src="~assets/images/all2.svg" alt=""/> -->
                                        </div>
                                        <!-- Orders List -->
                                        <h1 v-if="orders.length === 0">No orders</h1>
                                        <div id="accordionExample">
                                            <Orders :activeClass="order.payment_status" v-for="order in orders" :key="order.id" :accordionId="order.id" :order="order" />
                                            <pagination
                                                :order-link="orderLink()"
                                                :order-meta="allPaginations"
                                                @onPaginationEvent="loadPage"
                                                @pageLoading="data => loading = data"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- ONGOING ORDERS -->
                                <template v-if="displayOnlyAllTab">
                                    <div class="col-12" v-if="currentTab === 'ongoing'">
                                        <div class="collapse" :class="{show: currentTab === 'ongoing'}" id="ongoingOrders">
                                            <div class="d-flex mb-3">
                                                <p class="mt-3 pr-2"><b>{{headerIcon().dropDownText.ongoing}}</b></p>
                                                <!-- <img src="~assets/images/ongo.svg" alt=""/> -->
                                            </div>
                                            <h1 v-if="outstandingOrders.length === 0">No orders</h1>
                                            <div id="accordionExample">
                                                <Orders :activeClass="order.payment_status" v-for="order in outstandingOrders" :key="order.id" :accordionId="order.id" :order="order" />
                                                <pagination
                                                    :order-link="orderLink()"
                                                    :order-meta="outstandingPaginations"
                                                    @onPaginationEvent="loadPage"
                                                    @pageLoading="data => loading = data"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <!-- COMPLETE ORDERS -->
                                <template v-if="displayOnlyAllTab">
                                    <div class="col-12" v-if="currentTab === 'complete'">
                                        <div class="collapse" :class="{show: currentTab === 'complete'}" id="completeOrders">
                                            <div class="d-flex mb-3">
                                                <p class="mt-3 pr-2"><b>{{headerIcon().dropDownText.completed}}</b></p>
                                                <!-- <img src="~assets/images/tick-green.svg" alt=""/> -->
                                            </div>
                                            <h1 v-if="completedOrders.length === 0">No orders</h1>
                                            <div id="accordionExample">
                                                <Orders :activeClass="order.payment_status" v-for="order in completedOrders" :key="order.id" :accordionId="order.id" :order="order" />
                                                <pagination
                                                    :order-link="orderLink()"
                                                    :order-meta="completedPaginations"
                                                    @onPaginationEvent="loadPage"
                                                    @pageLoading="data => loading = data"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>

                    <div class="col-12" v-else>
                        <div class="row" mt-5>
                            <div class="col-12">
                                <!-- Search Orders -->
                                <div>
                                    <!-- <div class="d-flex mb-3">
                                        <p class="mt-3 pr-2"><b>Search Orders</b></p>
                                    </div> -->
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
        </section>
        <!-- Desktop Dashboard orders -->
        <section class="dashboard-main d-sm-block d-none content-wrapper">
            <div class="container-fluid">
                <div class="row  m-1">
                    <div class="col-md-12">
                        <p class="paymt-title">{{ headerIcon().text }}</p>
                        <div class="row mt-3 mb-5">
                            <div class="col-md-6">
                                <!-- payment navigation bar -->
                                <div class="status-nav">
                                    <a @click.prevent="showOrders" :class="[(curTab === 'all' || currentTab === 'all') ? 'active' : '']" href="#">{{headerIcon().allIcon.text}}</a>
                                    <a @click.prevent="showPending" :class="{active: currentTab === 'pending'}" v-if="userRole !== 'customer service'" href="#">{{headerIcon().pendingIcon.text}}</a>
                                    <a @click.prevent="showOngoing" :class="{active: currentTab === 'ongoing'}" v-if="userRole !== 'customer service' && userRole === 'messsage writer'" href="#">{{headerIcon().ongoingIcon.text}}</a>
                                    <a @click.prevent="showComplete" :class="{active: currentTab === 'complete'}" v-if="userRole !== 'customer service'" href="#">{{headerIcon().completedIcon.text}}</a>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <span class="entry ">
                                    <p>Total Entries:</p>
                                    <p v-if="currentTab === 'all' || curTab === 'all'">{{allPaginations.total || 0}}</p>
                                    <p v-else-if="currentTab === 'pending'">{{pendingPaginations.total || 0}}</p>
                                    <p v-else-if="currentTab === 'ongoing'">{{outstandingPaginations.total || 0}}</p>
                                    <p v-else>{{completedPaginations.total || 0}}</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div v-if="loading" class="text-center mb-5 loader-for-orders">
                            <Loader v-if="loading"/>
                        </div>
                    </div>

                    <div class="col-md-12 filter-table">
                        <div class="dash-filter">
                            <div class="dash-dropdown filter">
                                <div class="btn-group">
                                    <button type="button" class="dash-dropdown-toggle openBtn sort-icon-desktop">
                                        <span class="datepicker-toggle-button desk-datepicker"></span>
                                        <!-- <img src="~assets/images/calendar.svg" alt=""/> -->
                                        <input type="date" class="datepicker-input">

                                         <!-- <p class="my-auto">Filter</p> -->
                                        <!-- <span class="d-flex">
                                            <img class="img-fluid pr-2" src="~assets/images/filter.svg" alt="" />
                                           
                                        </span> -->
                                    </button>
                                    <!-- <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Name</a>
                                        <a class="dropdown-item" href="#">ID</a>
                                        <a class="dropdown-item" href="#">Time</a>

                                        <div class="border-top">
                                            <a class="dropdown-item" href="#">Separated link</a>
                                            <a class="dropdown-item" href="#">Separated link</a>
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="search-filter">
                                <img class="img-fluid" src="~assets/images/search.svg" alt="" />
                                <input type="text" placeholder="Search Orders by Order No, Tag No or Customer’s Name"
                                    autofocus>
                            </div>
                            <button v-if="userRole === 'customer service'" @click="$router.push('/booking-options')" class="btn btn-filter ml-auto" type="button">ADD ORDER</button>
                        </div>
                    
                        <div class="accordion table-responsive">
                            <DesktopTableOrders :curTab="curTab"
                                :currentTab="currentTab"
                                :orders="orders"
                                :pendingOrders="pendingOrders"
                                :outstandingOrders="outstandingOrders"
                                :completedOrders="completedOrders" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Orders from '../../components/Orders';
import OrderSortRow from "../../components/OrderSortRow";
import Loader from '../../components/Loader';
import {dashboardLink} from "../../helpers/Dashboard-Orders";
import {dashboard} from "../../helpers/Dashbord";
import Pagination from '../../components/Pagination.vue';
import DesktopTableOrders from '../../components/DesktopTableOrders';

export default {
    data: () => ({
        userType: '',
        showPagination: false,
        orders: [],
        pendingOrders: [],
        pendingPaginations: {},
        allPaginations: {},
        outstandingPaginations: {},
        completedPaginations: {},
        outstandingOrders: [],
        completedOrders: [],
        orderLinks: {},
        showSearchBar: false,
        currentTab: '',
        curTab: '',
        perPage: 10,
        loading: false,
        searchOrders: [],
        showSearch: false,
        cancelCount: 0,
        todayDate: '',
        displayOnlyAllTab: true,
        date: ''
    }),
    components: {OrderSortRow, Orders, Pagination, Loader, DesktopTableOrders},
    created() {
        this.$cookies.remove('customerDetails');
        this.$cookies.remove('orderType');
        this.$cookies.remove('orderMedium');
        this.getTodayDate();
    },
    mounted() {
        //Fetch userType
        this.userType = this.$cookies.get('userType');

        this.fetchDashboardOrders();
        // this.fetchOrders();

       this.curTab = this.curTab === 'all' ? '' : 'all';
    },
    methods: {
        getTodayDate() {
            this.date = new Date();
            this.todayDate = this.formatDate(this.date);
        },

        goToDashboard() {
            this.fetchDashboardOrders();
            this.displayOnlyAllTab = true;
            this.getTodayDate();
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

        // Get Filter Order API
        async getOrderFilterApi() {
            this.loading = true;
            // Function to return a new promise of the endpoint fetch dashboard orders
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await this.$axios.get(this.getOrderFilter());
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

        // Fetch order on date change
        async dateChangeHandler(date) {
            this.todayDate = date;
            try {
                    if (this.userRole === 'customer service') {
                        const {data: {data : {all_orders}}} = await this.getOrderFilterApi();
                        this.orders = all_orders.orders;
                        this.allPaginations = all_orders.pagination;
                        this.displayOnlyAllTab = false;
                    } else {
                        const {data: {data : {orders, pagination}}} = await this.getOrderFilterApi();
                        this.orders = orders;
                        this.allPaginations = pagination;
                        this.displayOnlyAllTab = false;

                    // } else if (this.userRole === 'message writer admin') {
                    //     const {data: {data : {orders, pagination}}} = await this.getOrderFilterApi();
                    //     this.orders = orders;
                    //     this.allPaginations = pagination;
                    //     this.displayOnlyAllTab = false;
                    // } else if (this.userRole === 'message writer') {
                    //     const {data: {data : {orders, pagination}}} = await this.getOrderFilterApi();
                    //     console.log(orders);
                    //     this.orders = orders;
                    //     this.allPaginations = pagination;
                    //     this.displayOnlyAllTab = false;

                    // } else if (this.userRole === 'collection officer') {
                    //     const {data: {data : {orders, pagination}}} = await this.getOrderFilterApi();
                    //     this.orders = orders;
                    //     this.allPaginations = pagination;
                    //     this.displayOnlyAllTab = false;
                    }
                } catch (e) {
                    console.log(e);
                }
        },
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

        encodeUrl(url) {
            if (url.includes('#')) {
                return `%23${url.split('#')[1]}`
            }
            return url;
        },

        cancelSearch() {
            this.searchOrders = [];
            this.cancelCount += 1;
            this.showSearch = false;
        },

        // Testing for each department to call the filter endpoint
        orderFilter(userRole, perPage, date) {
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
        // Get/Return the UserRole endpoint to filter by date
        getOrderFilter() {
            return this.orderFilter(this.userRole, this.perPage, this.todayDate);
        },

        orderLink() {
            switch (this.userRole) {
                case 'customer service':
                    if (this.currentTab === 'all') {
                        return `customer-service/dashboard?date=${this.todayDate}&perPage=${this.perPage}`;
                    }

                case 'cashier':
                    if (this.currentTab === 'all') {
                        return `cashier/dashboard/get-daily-orders?date=${this.todayDate}&perPage=${this.perPage}`;
                    } else if (this.currentTab === 'pending') {
                        return `cashier/dashboard/get-daily-pending-payment-orders?perPage=${this.perPage}`;
                    } else if (this.currentTab === 'ongoing') {
                        return `cashier/dashboard/get-daily-balance-outstanding-orders?perPage=${this.perPage}`;
                    } else {
                        return `cashier/dashboard/get-daily-paid-orders?perPage=${this.perPage}`;
                    }

                case 'message writer':
                    if (this.currentTab === 'all') {
                        return `message-writer/dashboard/get-today-paid-orders?date=${this.todayDate}&perPage=${this.perPage}`
                    } else if (this.currentTab === 'pending') {
                        return `message-writer/dashboard/get-my-pending-orders?perPage=${this.perPage}`
                    } else {
                        return `message-writer/dashboard/get-my-completed-orders?perPage=${this.perPage}`
                    }

                case 'message writer admin':
                    if (this.currentTab === 'all') {
                        return `message-writer/admin/dashboard/get-paid-orders?date=${this.todayDate}&perPage=${this.perPage}`
                    } else if (this.currentTab === 'pending') {
                        return `message-writer/admin/dashboard/get-unassigned-orders?perPage=${this.perPage}`
                    } else {
                        return `message-writer/admin/dashboard/get-today-assigned-orders?perPage=${this.perPage}`
                    }

                case 'collection officer':
                    if (this.currentTab === 'pending') {
                        return `collection-officer/dashboard/get-pending-pickup-orders?perPage=${this.perPage}`
                    } else if (this.currentTab === 'all') {
                        return `collection-officer/dashboard/get-completed-assigned-orders?date=${this.todayDate}&perPage=${this.perPage}`
                    } else {
                        return `collection-officer/dashboard/get-completed-pickup-orders?perPage=${this.perPage}`
                    }

                case 'logistics':
                    return `order/completed-delivery-writer-orders?perPage=${this.perPage}`;

                default:
                    return `order/all?perPage=${this.perPage}`;
            }
        },
        // Function to call the pagination
        async loadPage(event) {
            if (this.userRole === 'customer service' && this.currentTab === 'all') {
                const {data : {all_orders : {orders, pagination}}} = event;
                this.orders = orders;
                this.allPaginations = pagination;
            } else {
                const {data: {orders, pagination}} = event;
                if (this.currentTab === 'pending') {
                    this.pendingOrders = orders;
                    this.pendingPaginations = pagination;
                } else if (this.currentTab === 'all') {
                    this.orders = orders;
                    this.allPaginations = pagination;
                } else if (this.currentTab === 'complete') {
                    this.completedOrders = orders;
                    this.completedPaginations = pagination;
                } else if (this.currentTab === 'ongoing') {
                    this.outstandingOrders = orders;
                    this.outstandingPaginations = pagination;
                }
            }
            // const {data: {orders, pagination}} = event;
            // this.orders = orders;
            // this.orderMeta = pagination;
            this.loading = false;
        },
        // Fucntion to display the dashboard text and icon
        headerIcon() {
            return dashboard(this.userRole);
        },
        // Get the dashboard API
        async getDashboardOrdersApi() {
            this.loading = true;
            // Function to return a new promise of the endpoint fetch dashboard orders
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await this.$axios.get(this.getDashboardOrders());
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
        // Fetch the dashboard endpoint
        async fetchDashboardOrders() {
              try {
                if (this.userRole === 'customer service') {
                    const {data: {data : {all_orders}}} = await this.getDashboardOrdersApi();
                    // const {data: {data : {all_orders}}} = await this.$axios.get(this.getDashboardOrders());
                    this.orders = all_orders.orders;
                    this.allPaginations = all_orders.pagination;
                } else if (this.userRole === 'cashier') {
                    const {data: {data : {orders, pending_orders, balance_outstanding_orders, paid_orders}}} = await this.getDashboardOrdersApi();

                    this.orders = orders.orders;
                    this.allPaginations = orders.pagination;

                    this.pendingOrders = pending_orders.orders;
                    this.pendingPaginations = pending_orders.pagination;

                    this.outstandingOrders = balance_outstanding_orders.orders;
                    this.outstandingPaginations = balance_outstanding_orders.pagination;

                    this.completedOrders = paid_orders.orders;
                    this.completedPaginations = paid_orders.pagination;

                } else if (this.userRole === 'message writer admin') {
                    const {data: {data : {all_orders, unassigned_orders, assigned_orders}}} = await this.getDashboardOrdersApi();
                    this.orders = all_orders.orders;
                    this.allPaginations = all_orders.pagination;

                    this.pendingOrders = unassigned_orders.orders;
                    this.pendingPaginations = unassigned_orders.pagination;

                    this.outstandingOrders = assigned_orders.orders;
                    this.outstandingPaginations = assigned_orders.pagination;

                } else if (this.userRole === 'message writer') {
                    const {data: {data : {all_orders, pending_orders, completed_orders}}} = await this.getDashboardOrdersApi();
                    this.orders = all_orders.orders;
                    this.allPaginations = all_orders.pagination;

                    this.pendingOrders = pending_orders.orders;
                    this.pendingPaginations = pending_orders.pagination;

                    this.completedOrders = completed_orders.orders;
                    this.completedPaginations = completed_orders.pagination;

                } else if (this.userRole === 'collection officer') {
                    const {data: {data : {all_completed_assigned_orders, assigned_orders, pending_pickup_orders, completed_pickup_orders}}} = await this.getDashboardOrdersApi();
                    this.orders = all_completed_assigned_orders.orders;
                    this.allPaginations = all_completed_assigned_orders.pagination;

                    this.pendingOrders = pending_pickup_orders.orders;
                    this.pendingPaginations = pending_pickup_orders.pagination;

                    this.completedOrders = completed_pickup_orders.orders;
                    this.completedPaginations = completed_pickup_orders.pagination;

                    this.outstandingOrders = assigned_orders.orders;
                    this.outstandingPaginations = assigned_orders.pagination;

                } else if (this.userRole === 'logistics') {
                    const {data} = await this.getDashboardOrdersApi();
                }
            } catch (e) {
                console.log(e);
            }
        },
        // Fetch orders
        async fetchOrders() {
            const {data: {data: {orders, pagination}}} = await this.$axios.get(this.getOrderLink());
            this.orders = orders;
            this.orderLinks = pagination;
        },
        // Get orders endpoint for the UserRole
        getOrderLink() {
            return orderLink(this.userRole, this.perPage, this.date);
        },
        // Get dashboard endpoint for the UserRole
        getDashboardOrders() {
            return dashboardLink(this.userRole, this.perPage);
        },
        // Show All orders tab
        showOrders() {
            this.currentTab = this.currentTab === 'all' ? '' : 'all';
        },
        // Show Pending orders tab
        showPending() {
            this.currentTab = this.currentTab === 'pending' ? '' : 'pending';
            this.curTab = '';
        },
        // Show Ongoing/Outstaning/Asigned orders tab
        showOngoing() {
            this.currentTab = this.currentTab === 'ongoing' ? '' : 'ongoing';
            this.curTab = '';
        },
        // Show Complete/Paid orders tab
        showComplete() {
            this.currentTab = this.currentTab === 'complete' ? '' : 'complete';
            this.curTab = '';
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

<style>
    .dashborad-head-txt {
        font-size: 20px;
        font-weight: bold;
    }

    .aOrdersCustomerService {
        padding: 20px!important;
    }

    .ico-customer-service {
        width: 90px!important;
        height: 90px!important;
        margin: 0 auto;
    }

    .img-customer-service {
        width: 35px;
    }

    .text-customer-service {
        font-size: 30px!important;
    }

    .sort-icon-desktop {
        display: inline-block;
        position: relative;
        width: 51px;
        height: 51px;
    }

    .desk-datepicker {
        background-size: 49px;
    }
</style>
