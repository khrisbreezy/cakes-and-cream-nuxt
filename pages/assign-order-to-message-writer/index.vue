<template>
    <section class="data-sorting">
        <div class="container">
            <div class="row">
                <OrderSortRow/>
                <div class="text-center mx-auto">
                    <Loader v-if="pageLoading"/>
                </div>

                <div class="col-12 mt-5" v-if="!pageLoading">

                    <form class="sign-in" @submit.prevent="assignHandler" v-if="writerOrders.length > 0">
                        <div v-for="writerOrder in writerOrders" class="writer-order" :key="writerOrder.order_no">
                            <p class="orderid-text">Order {{ writerOrder.order_no }}</p>

                            <div class="form-group">
                                <label>Select</label>
                                <v-select :options="messageWriters" v-model="writerOrder.writer_id"
                                          placeholder="Choose a writer to assign."/>
                            </div>
                        </div>

                        <div class="btn-row">
                            <button class="btn btn-loading btn-primary ml-auto" type="submit" :disabled="loading">
                                {{ loading ? 'Updating' : 'Update' }}
                                <BtnLoader v-if="loading"/>
                            </button>
                        </div>
                    </form>

                    <h3 v-else>No Orders Yet!</h3>

                </div>

            </div>
        </div>
    </section>
</template>

<script>
import OrderSortRow from "../../components/OrderSortRow";
import BtnLoader from "../../components/BtnLoader";
import Loader from "../../components/Loader";

export default {
    components: {OrderSortRow, BtnLoader, Loader},
    data: () => ({
        writerOrders: [],
        messageWriters: [],
        loading: false,
        pageLoading: false,
    }),
    async created() {
        this.pageLoading = true;
        try {
            const {data: {data: orders}} = await this.$axios.get('message-writer/get-paid-orders');
            this.writerOrders = orders.map(order => ({
                ...order, writer_id: {
                    label: order.message_writer ? `${order.message_writer.user.first_name} ${order.message_writer.user.last_name}` : '',
                    value: order.message_writer ? order.message_writer.assigned_to : ''
                }
            }));
            this.pageLoading = false;
            const {data: {data: writers}} = await this.$axios.get('message-writer/admin/get-message-writers');
            this.messageWriters = writers.map(writer => ({label: writer.name, value: writer.id}));

        } catch (e) {
            console.log(e);
            this.pageLoading = false;
        }
    },
    mounted() {

    },
    methods: {
        async assignHandler() {
            this.loading = true;
            try {
                const writer_orders = this.writerOrders.filter(order => !!order.writer_id.label).map(order => ({
                    order_id: order.id,
                    user_id: order.writer_id.value
                }));
                const {data: response} = await this.$axios.post('message-writer/admin/assign-orders', {writer_orders});

                this.$toast.success(response.message);
                this.loading = false;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        }
    },
    computed: {}
}
</script>

<style lang="scss" scoped>
.writer-order {
    margin-bottom: 25px;
}
</style>
