<template>
  <section class="login-form">
    <img class="img-fluid blob" src="~assets/images/top-blob.png" alt="" />
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="text-center">
              <img class="logo img-fluid" src="~assets/images/logo.png" alt="" />
            </div>

            <div class="form-wrapper">
                <h1>Recover Password</h1>
                <p>Don’t fret. Enter the email address associated with your account and we’ll send you a link to reset your password.</p>

                <form class="sign-in" @submit.prevent="sendEmail">
                    <div class="form-group email">
                        <label>Email Address</label>
                        <input type="email" v-model="user.email">
                    </div>

                    <div class="text-center">
                          <Loader v-if="loading" />
                    </div>
                    <button v-if="!loading" class="btn w-100" type="submit">Send</button>

                    <div class="text-center">
                        <a @click.prevent="$router.push('/sign-in')" href="">Back to sign in</a>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from '../../components/Loader';
  export default {
    layout: 'no-nav',
    data() {
      return {
        showPassword: false,
        loading: false,
        user: {}
      }
    },
    components: {Loader},
    mounted() {
      // For csrf-cookie
      this.$axios.$get('csrf-cookie');

      // for active input form
      (function($){
        const form = document.querySelector("form.sign-in");
        const formGroups = document.querySelectorAll("form.sign-in div.form-group");

        for (let i = 0; i < formGroups.length; i++) {
            formGroups[i].addEventListener("click", function() {
                if(form.querySelectorAll(".active").length){
                    form.querySelectorAll(".active")[0].classList.remove("active");
                }
                this.className += " active";
            });
        }
      })(jQuery);
    },
    methods: {
      async sendEmail() {
        this.loading = true;

        try {
          const {data} = await this.$axios.post('user/password/reset', this.user);
          console.log(data, 'the respoonse');
          this.loading = false;
          this.$toast.success(data.message);
          this.user = {};
        } catch(e) {
          this.loading = false;
            this.$toast.error(e.response.data.message);
        }
      }
    }
  };
</script>

<style>
</style>
