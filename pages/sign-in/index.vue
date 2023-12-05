<template>
    <section class="login-form">
        <img class="img-fluid blob" src="~assets/images/top-blob.png" alt=""/>
        <img src="~assets/images/blog-desktop.svg" alt="" class="img-fluid blob-image-desktop" />
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="text-center">
                        <img class="logo img-fluid" src="~assets/images/logo.png" alt=""/>
                    </div>
                    <div class="col-sm-9 col-12 mx-auto">
                        <div class="form-wrapper sign-in-wrapper">
                            <h1>Sign In</h1>
                            <p>Please input your login details</p>

                            <div class="row">
                                <div class="col-lg-6 col-12 mx-auto">
                                    <form class="sign-in" @submit.prevent="login">
                                        <div class="form-group email mb-sm-4">
                                            <label>Email Address</label>
                                            <input type="email" v-model="user.email"/>
                                        </div>

                                        <div class="form-group password mb-sm-4">
                                            <label>Password</label>
                                            <input v-bind:type="[showPassword ? 'text' : 'password']" v-model="user.password"/>
                                            <i @click="showPassword = !showPassword" class="fa"
                                            :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                                        </div>

                                        <label class="checkbox-wrapper mt-4 mb-3">
                                            <input type="checkbox" checked="checked"/>
                                            <span class="checkmark"></span>
                                            Remember me
                                        </label>

                                        <div class="text-center">
                                            <Loader v-if="loading"/>
                                        </div>
                                        <button v-if="!loading" class="btn w-100" type="submit">Log In</button>

                                        <div class="text-center text-sm-left">
                                            <a href="#" @click.prevent="$router.push('/recover-password')">Forgot Password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from '../../components/Loader.vue';

export default {
    layout: 'no-nav',
    data: () => ({
        showPassword: false,
        user: {},
        loading: false,
        userRoleName: ''
    }),
    components: {
        Loader
    },
    mounted() {
        // For csrf-cookie
        this.$axios.$get('csrf-cookie');

        // for active input form
        (function ($) {
            const form = document.querySelector("form.sign-in");
            const formGroups = document.querySelectorAll("form.sign-in div.form-group");

            for (let i = 0; i < formGroups.length; i++) {
                formGroups[i].addEventListener("click", function () {
                    if (form.querySelectorAll(".active").length) {
                        form.querySelectorAll(".active")[0].classList.remove("active");
                    }
                    this.className += " active";
                });
            }
        })(jQuery);

        // User Role
        this.userRoleName = this.$cookies.get('userRoleName');
    },
    methods: {
        async login() {
            this.loading = true;
            //  this.$cookies.set('userInfo', this.user);
            try {
                const res = await this.$store.dispatch('login', this.user);
                let {data: {data: response}} = res;
                // console.log(response, 'the res');
                // this.$toast.success(response.data.message, {duration: 6000});
                this.$toast.success('Logged in', {duration: 4000});
                let intended = this.$cookies.get('intended_url');
                if (intended) {
                    this.$router.push(intended);
                    this.$cookies.remove('intended_url');
                    return;
                }
                if (response.user.role === 'production manager') {
                    this.$router.push('/bookings');
                } else {
                    this.$router.push('/dashboard');
                }
                
                // if (response.user.role == 'customer service') {
                //   this.$router.push('/dashboard');
                // } else if (response.user.role == 'cashier') {
                //   this.$router.push('/dashboard');
                // } else if (response.user.role == 'message writer') {

                // } else if (response.user.role == 'logistics') {

                // } else if (response.user.role == 'production') {

                // } else if (response.user.role == 'collection') {

                // }

                this.loading = false;

                // this.$router.push('/otp-verification');
            } catch (e) {
                if (e.type === 'roleError') {
                    this.$toast.error(e.message);
                } else {
                    console.log(e, 'the-error');
                    // Trying to work on the error message display
                    this.$toast.error(e.response.data.message);
                }
                this.loading = false;
            }
        }

    }
};
</script>

<style>
</style>
