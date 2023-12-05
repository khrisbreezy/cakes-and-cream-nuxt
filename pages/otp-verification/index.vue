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
                <h1>OTP Verification</h1>
                <p>Please input the six digit code that was sent to your email: {{user.email}}</p>

                <p></p>

                <form class="sign-in"@submit.prevent="verifyOtp">
                    <div class="otp-wrapper">
                        <div class="form-group">
                            <input type="text" maxlength="1" autofocus="" v-model="otp.first">
                        </div>

                        <div class="form-group">
                            <input type="text" maxlength="1" v-model="otp.second">
                        </div>

                        <div class="form-group">
                            <input type="text" maxlength="1" v-model="otp.third">
                        </div>

                        <div class="form-group">
                            <input type="text" maxlength="1" v-model="otp.fouth">
                        </div>

                        <div class="form-group">
                            <input type="text" maxlength="1" v-model="otp.fifth">
                        </div>

                        <div class="form-group">
                            <input type="text" maxlength="1" v-model="otp.sixth">
                        </div>
                    </div>
                    <div class="text-center">
                      <Loader v-if="loading" />
                    </div>
                     <button  v-if="!loading"  class="btn w-100" type="submit">Verify</button>
                    <p class="mt-5">Resend OTP in <span class="color-blue">00:{{seconds}}</span></p> 
                </form>
                <div class="text-center">
                  <Loader v-if="loaded" />
                </div>
                <button  @click="resendToken" v-if="seconds === 0 && !loaded"  class="btn w-100" type="submit">Resend Otp</button>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Loader from '../../components/Loader';

  export default {  
    data: () => ({
      user: {},
      otp: {},
      loading: false,
      loaded: false,
      seconds: 60,
      userInfo: {}
    }),
     components: {
      Loader
    },
    created() {
    },
    mounted() {
      this.user = this.$cookies.get('user');
      this.userInfo = this.$cookies.get('userInfo');
      console.log(this.userInfo, 'theInfo');
      // reset timer for token
        setInterval(() => {
          this.countDown()
        }, 1000);
    },
    methods: {
      async verifyOtp() {
        let theOtpCode = this.otp.first + this.otp.second + this.otp.third + this.otp.fouth + this.otp.fifth + this.otp.sixth; 
        const newCode = {
          otp : parseInt(theOtpCode)
        } 
        this.loading = true;
        try {
          console.log(typeof(theOtpCode), theOtpCode, 'the otp');
          console.log(typeof(newCode), newCode,  'the otp');
           const {data: response} = await this.$axios.post('user/verify-2FA', newCode);
          console.log(response, 'the responses');
          this.loading = false;
        } catch (e) {
          console.log(e);
           this.$toast.error(e.response.data.message);
          this.loading = false;
          // console.log(e);
        }
      },
      countDown() {
          if (this.seconds > 0) {
            this.seconds--;
          } else {
            this.seconds = 0;
          }
      },
      async resendToken() {
        this.loaded = true;
         try {
            const response = await this.$store.dispatch('login', this.userInfo);
            console.log(response, 'the res');
            this.$toast.success(response.data.message, {duration: 6000});
            this.loaded = false;
            this.$router.push('/otp-verification');
          } catch (e) {
            console.log(e, 'the-error');
            // Trying to work on the error message display
            this.$toast.error(e.response.data.message);
            this.loaded = false;
          }
      }
    }
  }
  
</script>

<style>
</style>