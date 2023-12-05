<template>
  <div v-if="pageLoading" class="col-12">
        <div class="text-center loading-desktop-view loader-for-orders">
            <Loader v-if="pageLoading"/>
        </div>
  </div>

  <div v-else>
    <OrderSummary :orderDetails="order" />
    <div class="text-right d-sm-none d-block">
      <img @click="$router.push('/booking-options')" class="img-add img-fluid" src="~assets/images/add-new-order.svg" alt="">
    </div>
     <!-- <button class="btn w-100 mt-4"  type="button">Add New Order</button> -->
  </div>
</template>

<script>
  import OrderSummary from '../../components/OrderSummary';
  import Loader from '../../components/Loader';

  export default {
    data: () => ({
      order: {},
      pageLoading: false
    }),
    components: {OrderSummary, Loader},
    created() {
      if (this.$cookies.get('order-response')) {
        this.order = this.$cookies.get('order-response');
      }
      this.getOrder();
    },
    methods: {
      async getOrder() {
        this.pageLoading = true;
        try {
            const {data: {data}} = await this.$axios.get(`order/${this.$route.params.id}/order`);
            this.order = data;
            this.pageLoading = false;
        } catch (e) {
            console.log(e);
            this.pageLoading = false;
        }
      },
    }
  }
</script>


<style scoped>
  .order-number {
    font-size: 20px;
    color: #333333;
  }

  .img-add {
    cursor: pointer;
  }
</style>
