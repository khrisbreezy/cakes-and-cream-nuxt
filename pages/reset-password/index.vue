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
                <h1>Reset Password</h1>
                <p>Please input a new password for this account.</p>

                <form class="sign-in" @submit.prevent="submitResetPassword">
                    <div v-if="showField" class="form-group password">
                        <label>New password</label>
                        <input v-model="password.newPassword" v-bind:type="[showPassword1 ? 'text' : 'password']" />
                         <i @click="showPassword1 = !showPassword1"  class="fa" :class="[showPassword1 ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </div>

                    <div v-if="showField" class="form-group password">
                        <label>Re-enter your new password</label>
                        <input v-model="password.reEnterNewPassword" v-bind:type="[showPassword2 ? 'text' : 'password']" />
                        <i @click="showPassword2 = !showPassword2"  class="fa" :class="[showPassword2 ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </div>
                    <p v-if="showPasswordError" class="error">Password doesn't match</p>
                    <p v-if="!showField" class="text-center invalid-text">{{invalidToken}}</p>
                    <p class="text-center">
                        <a href="" @click.prevent="$router.push('/recover-password')" v-if="!showField" class="invalid-text">Resend link</a>
                    </p>
                     <div class="text-center">
                          <Loader v-if="loading"/>
                      </div>
                    <button v-if="!loading || gotoSignin" :disabled="!showField" class="btn w-100" type="submit">Reset</button>
                    <p v-if="gotoSignin" class="text-center">
                        <a href="" @click.prevent="$router.push('/sign-in')" v-if="showField" class="invalid-text">Goto sign-in</a>
                    </p>
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
        showPassword1: false,
        showPassword2: false,
        password: {},
        showField: true,
        invalidToken: '',
        userEmail: '',
        showPasswordError: false,
        loading: false,
        gotoSignin: false
      }
    },
    components: {
        Loader
    },
    async created() {
     
    },
    async mounted() {
      // For csrf-cookie
      this.$axios.$get('csrf-cookie');
      
      // Token verification for password rest
      try {
        const {data: {data: response}} = await this.$axios.get(`token/verify/${this.$route.query.token}`);
        this.userEmail = response.email;
        console.log(response);
      } catch(e) {
        this.showField = false
        this.invalidToken = e.response.data.message;
        console.log(e.response);
      }
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
    },
    methods: {
      
      async submitResetPassword() {
         this.loading = true;
        console.log(this.password);
        if (this.password.newPassword !== this.password.reEnterNewPassword)  {
          this.showPasswordError = true;
           this.loading = false;
          return;
        }

        const resetDetails = {
          email: this.userEmail,
          password: this.password.newPassword
        }

        try {
          this.showPasswordError = false;
          const {data} = await this.$axios.put('user/password/reset', resetDetails);
          console.log(data);
          this.$toast.success('Password reset successful');
          this.loading = false;
          this.gotoSignin = true;
          this.password = {};
        } catch(e) {
          console.log(e);
          this.$toast.error(e.response.data.message);
          this.loading = false;
          this.gotoSignin = false;
        }
      }
    }
};
</script>

<style>
.invalid-text {
  font-size: 20px;
}
</style>
