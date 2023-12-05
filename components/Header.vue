<template>
    <div>
        <!-- Mobile navbar -->
        <nav class="navbar mobile-nav d-sm-none d-flex navbar-offcanvas navbar-expand-sm">
            <a class="navbar-brand" href="#">
                <img src="~assets/images/profile-1.jpg" alt="" v-if="!user.image_url"/> 
                <img :src="user.image_url" alt="" v-else />
                {{ user.first_name }} {{ user.last_name }}  
            </a>

            <button class="navbar-toggler" type="button" data-toggle="offcanvas">
                <img src="~assets/images/menu.svg"/>
            </button>

            <div class="navbar-collapse offcanvas-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li v-if="user.role !== 'production manager'" class="nav-item active">
                        <a @click="$router.push('/dashboard')" class="nav-link">Dashboard <span class="sr-only">(current)</span></a>
                    </li>
                    <li v-if="user.role === 'production manager'" class="nav-item active">
                        <a @click="$router.push('/bookings')" class="nav-link">Bookings <span class="sr-only">(current)</span></a>
                    </li>
                    <!-- <li v-if="user.role === 'production manager'" class="nav-item">
                        <a @click="$router.push('/orders')" class="nav-link">Assign Booking Orders</a>
                    </li> -->
                    <li v-if="user.role === 'production manager'" class="nav-item">
                        <a @click="$router.push('/add-cake')" class="nav-link">Add Cake</a>
                    </li>
                     <li v-if="user.role === 'production manager'" class="nav-item">
                        <a @click="$router.push('/todo-orders')" class="nav-link">To-Do Orders</a>
                    </li>
                    <!--                <li v-if="user.role !== 'production'" class="nav-item">-->
                    <!--                    <a @click="$router.push('/orders')" class="nav-link">Orders</a>-->
                    <!--                </li>-->
                    <li class="nav-item" v-if="user.role === 'customer service'">
                        <a @click="$router.push('/booking-options')" class="nav-link">Add Order</a>
                    </li>
                    <li class="nav-item" v-if="user.role === 'message writer admin'">
                        <a @click="$router.push('/assign-order-to-message-writer')" class="nav-link">Assign Orders</a>
                    </li>
                    <li class="nav-item" v-if="user.role === 'logistics'">
                        <a @click="$router.push('/assign-order-to-logistics-officer')" class="nav-link">Assign Orders</a>
                    </li>
                    <li class="nav-item">
                        <a @click="$router.push('/profile')" class="nav-link">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a @click.prevent="logout" class="nav-link">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>

        <nav class="navbar d-sm-flex d-none  desktop-nav">
            <div class="dash-search">
                <img class="img-fluid" src="~assets/images/search.svg" alt="" />
                <input type="text" placeholder="Search Data">
            </div>
            <!-- top nav dropdown Dropdown -->
            <div class="dash-dropdown">
                <div class="btn-group">
                    <button type="button" class="dash-dropdown-toggle" data-toggle="dropdown">
                        <div class="d-flex">
                            <img class="img-fluid avatar" src="~assets/images/profile-1.jpg" alt="" v-if="!user.image_url"/> 
                            <img class="img-fluid avatar" :src="user.image_url" alt="" v-else />
                            <!-- <img class="img-fluid avatar" src="~assets/images/profile.jpg" alt="" /> -->
                            <p class="my-auto pr-3"> {{ user.first_name }} {{ user.last_name }}  </p>
                            <span class=" drop-icon">
                                <img class="img-fluid" src="~assets/images/dropdown-i.svg" alt="" />
                            </span>
                        </div>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">My profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <a class="dropdown-item" href="#">Activiy</a>
                        <div class="border-top">
                            <a class="dropdown-item" href="#">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Desktop view side-navigation -->
        <nav class="navbar sidebar d-sm-flex d-none">
            <!-- sidebar Logo -->
            <div class="brand-logo">
                <a href="#">
                    <img class="img-fluid" src="~assets/images/logo.png" alt="" />
                </a>
            </div>
            <!-- Sidebar menu -->
            <ul>
                <p class="main-txt">GENERAL</p>
                <li v-if="user.role !== 'production manager'">
                    <a @click.prevent="$router.push('/dashboard')" :class="[$route.name.includes('dashboard') ? 'dash-item-active' : '']" class="dash-item" href="#">
                        <span class="dash-icon">
                            <img src="~assets/images/overview.svg" alt="" />
                        </span>
                        Dashboard
                    </a>
                </li>

                <p class="main-txt">ORDER STATUS</p>
                <li>
                    <a class="dash-item" href="#">
                        <span class="dash-icon">
                            <img src="~assets/images/file.svg" alt="" />
                        </span>
                        All Orders
                    </a>
                </li>
                <li>
                    <a class="dash-item" href="#">
                        <span class="dash-icon">
                            <img src="~assets/images/clock2.svg" alt="" />
                        </span>
                        Pending
                    </a>
                </li>
                <li>
                    <a class="dash-item" href="#">
                        <span class="dash-icon">
                            <img src="~assets/images/recycle.svg" alt="" />
                        </span>
                        Outstanding
                    </a>
                </li>
                <li>
                    <a href="" class="dash-item" data-target="#submenu1" data-toggle="collapse" aria-expanded="false">
                        <span class="dash-icon">
                            <img src="~assets/images/checkmarks.svg" alt="" />
                        </span>
                        Completed
                        <span class="dash-arrow">
                            <img src="~assets/images/dropdown-i.svg" alt="" />
                        </span>
                    </a>
                    <ul id="submenu1" class="submenu collapse">
                        <li>
                            <a href="#">By Date</a>
                        </li>
                        <li>
                            <a href="#">By Order Number</a>
                        </li>
                        <li>
                            <a href="#">By Tag Number</a>
                        </li>
                        <li>
                            <a href="#">By Customer's Name</a>
                        </li>
                    </ul>
                </li>

                <p class="main-txt">ORDER HISTORY</p>
                <li>
                    <a href="" class="dash-item" data-target="#submenu2" data-toggle="collapse">
                        <span class="dash-icon">
                            <img src="~assets/images/history.svg" alt="" />
                        </span>
                        History
                        <span class="dash-arrow">
                            <img src="~assets/images/dropdown-i.svg" alt="" />
                        </span>
                    </a>
                    <ul id="submenu2" class="submenu">
                        <li>
                            <a href="#">Express Orders</a>
                        </li>
                        <li>
                            <a href="#">Pre-order</a>
                        </li>
                    </ul>

                </li>

                <p class="main-txt">HELP CENTER</p>
                <li>
                    <a href="" class="dash-item" data-target="#submenu3" data-toggle="collapse">
                        <span class="dash-icon">
                            <img src="~assets/images/help.svg" alt="" />
                        </span>
                        Help
                        <span class="dash-arrow">
                            <img src="~assets/images/dropdown-i.svg" alt="" />
                        </span>
                    </a>
                    <ul id="submenu3" class="submenu">
                        <li>
                            <a href="#">Complaints</a>
                        </li>
                        <li>
                            <a href="#">Feedback</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="logout" class="dash-item sidebar-footer" href="#">
                        <span class="dash-icon">
                            <img src="~assets/images/logout.svg" alt="" />
                        </span>
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data: () => ({
        profileImage: '',
    }),
    mounted() {
        $('[data-toggle="offcanvas"]').on("click", function () {
            $(".offcanvas-collapse").toggleClass("open");
        });
        $('.nav-item .nav-link').on("click", function () {
            $(".offcanvas-collapse").toggleClass("open");
        });
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            this.$cookies.remove('orderType');
            this.$cookies.remove('orderMedium');
            this.$cookies.remove('customerDetails');
            this.$cookies.remove('cakeDetails');

            this.$toast.success("Logged out");
            await this.$router.push("/");
        }

    },
    computed: {
        user() {
            return this.$store.getters.getUser || {};
        }
    },
};
</script>

<style scoped>
</style>
