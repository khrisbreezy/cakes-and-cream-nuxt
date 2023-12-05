<template>
  <section class="customer-details booking-options">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Cake Details</h1>
          <ExpressOrderDetails v-if="orderType === 'express_order'"/>
          <PreOrderOrderDetails v-else-if="orderType === 'pre_order'" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ExpressOrderDetails from "../../components/ExpressOrderDetails";
import PreOrderOrderDetails from "../../components/PreOrderOrderDetails";

export default {
  components: {PreOrderOrderDetails, ExpressOrderDetails},
  data: () => ({
    orderType: ''
  }),
  mounted() {
    this.orderType = this.$cookies.get('orderType');
  }
};
</script>
