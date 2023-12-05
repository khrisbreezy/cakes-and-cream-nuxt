<template>
  <section class="login-form welcome-screen">
    <img class="img-fluid blob" src="~assets/images/top-blob.png" alt=""/>
    <img src="~assets/images/blog-desktop.svg" alt="" class="img-fluid blob-image-desktop" />
    <!-- <div class="blob-image-desktop"></div> -->
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <div class="w-100 pt-5 mt-5"> -->
            <div class="text-center">
              <img class="logo img-fluid" src="~assets/images/logo.png" alt=""/>
            </div>
            <div class="row">
              <div class="col-sm-9 col-12 mx-auto">
                <div class="form-wrapper">
                  <h1>Welcome</h1>
                  <p>Please select the department you belong to</p>

                  <div class="welcome-list">
                    <div class="text-center">
                          <Loader v-if="loading" />
                    </div>
                    <div class="row text-center">
                      <div class="col-6 col-sm-4" v-for="(welcomeTab, index) in welcomeTabList" :key="index">
                        <div @click="activeTabHandler(welcomeTab.id, welcomeTab.name)" :class="{active: activeClass === welcomeTab.id}"
                            class="welcome-list-tab">
                          <div class="img-round">
                            <img :src="welcomeTab.image" alt="" class="img-fluid">
                          </div>
                          <p>{{ welcomeTab.name }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-right">
                    <!-- <nuxt-link @click="submitTabHandler" class="btn btn-primary" to="/sign-in" >Next</nuxt-link> -->
                    <button :disabled="btnDisabled" @click="submitTabHandler" class="btn btn-primary">Next</button>
                  </div>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Loader from '../components/Loader';

  export default {
    layout: 'no-nav',
    data: () => ({
      activeClass: 1,
      activeRoleName: 'customer service',
      welcomeTabList: [],
      loading: false,
      btnDisabled: false
    }),
    components: {
      Loader
    },
    mounted() {
      this.$cookies.set('userRoleName', this.activeRoleName);
    },
    created() {
      this.fetchUserRoles();
      this.$cookies.set('userRoleId', this.activeClass);
    },
    methods: {
       async fetchUserRoles() {
        this.loading = true;
        this.btnDisabled = true;
        try {
          const {data: response} = await this.$axios.get('get-roles');
          this.welcomeTabList = response.data.filter(item => !item.name.includes('logistics') && item.name !== 'dispatch rider' && item.name !== 'message writer admin');
          this.loading = false;
          this.btnDisabled = false;
          // this.$toast.success('Logged out', {duration: 6000});
        } catch(e) {
          this.loading = false;
          this.btnDisabled = true;
        }
      },
      activeTabHandler(id, name) {
        this.activeClass = id;
        this.activeRoleName = name;
        this.$cookies.set('userRoleId', id);
        this.$cookies.set('userRoleName', name);
      },
      submitTabHandler() {
       this.$router.push('/sign-in');
      },

    }
  };
</script>

<style>
</style>
