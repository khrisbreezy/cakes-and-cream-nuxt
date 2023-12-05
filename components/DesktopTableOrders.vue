<template>
    <div>
        <!-- All Orders -->
        <table v-if="curTab === 'all' || currentTab === 'all'" class="table table-borderless mb-0">
            <thead class="table-secondary">
                <tr>
                    <th>
                        <p>Order Number</p>
                    </th>
                    <th>
                        <p>Order Type</p>
                    </th>
                    <th>
                        <p>Customer Details</p>
                    </th>
                    <th>
                        <p>Status</p>
                    </th>
                    <th>
                        <p>Amount</p>
                    </th>
                    <th><p>Action</p></th>
                </tr>
            </thead>
            <tbody class="accordion border-top">
                    <tr v-if="orders.length === 0">
                        <td colspan="6">
                            <div class="row">
                                <div class="col-md-3 col-6 mx-auto">
                                    <h1>No Order</h1>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <DesktopSingleOrders v-for="order in orders" :order="order" :key="order.id" />
            </tbody>
            <tfoot v-if="orders.length > 0">
                <tr class="table-light border-top">
                    <th colspan="9">
                        <div class="table-pagination">
                            <p class="pagi-label">Row per page:</p>

                            <div class="form-group form-group-pagination">
                                <select>
                                    <option>41</option>
                                </select>
                            </div>

                            <p class="pagi-label">1-10 of 254</p>
                            <div class="pagi-nav">
                                <img src="~assets/images/pagi-prev.svg" alt="" />
                                <img src="~assets/images/pagi-next.svg" alt="" />
                            </div>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>

        <!-- Pending Orders-->
        <table v-if="currentTab === 'pending'" class="table table-borderless mb-0">
            <thead class="table-secondary">
                <tr>
                    <th>
                        <p>Order Number</p>
                    </th>
                    <th>
                        <p>Order Type</p>
                    </th>
                    <th>
                        <p>Customer Details</p>
                    </th>
                    <th>
                        <p>Status</p>
                    </th>
                    <th>
                        <p>Amount</p>
                    </th>
                    <th><p>Action</p></th>
                </tr>
            </thead>

            <tbody class="accordion border-top">
                    <tr v-if="orders.length === 0">
                        <td colspan="6">
                            <div class="row">
                                <div class="col-md-3 col-6 mx-auto">
                                    <h1>No Order</h1>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <DesktopSingleOrders v-for="order in pendingOrders" :order="order" :key="order.id" />
            </tbody>
            <tfoot v-if="orders.length > 0">
                <tr class="table-light border-top">
                    <th colspan="9">
                        <div class="table-pagination">
                            <p class="pagi-label">Row per page:</p>

                            <div class="form-group form-group-pagination">
                                <select>
                                    <option>41</option>
                                </select>
                            </div>

                            <p class="pagi-label">1-10 of 254</p>
                            <div class="pagi-nav">
                                <img src="~assets/images/pagi-prev.svg" alt="" />
                                <img src="~assets/images/pagi-next.svg" alt="" />
                            </div>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>

        <!-- Outstanding Orders-->
        <table v-if="currentTab === 'ongoing'" class="table table-borderless mb-0">
            <thead class="table-secondary">
                <tr>
                    <th>
                        <p>Order Number</p>
                    </th>
                    <th>
                        <p>Order Type</p>
                    </th>
                    <th>
                        <p>Customer Details</p>
                    </th>
                    <th>
                        <p>Status</p>
                    </th>
                    <th>
                        <p>Amount</p>
                    </th>
                    <th><p>Action</p></th>
                </tr>
            </thead>

            <tbody class="accordion border-top">
                    <tr v-if="outstandingOrders.length === 0">
                        <td colspan="6">
                            <div class="row">
                                <div class="col-md-3 col-6 mx-auto">
                                    <h1>No Order</h1>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <DesktopSingleOrders v-for="order in outstandingOrders" :order="order" :key="order.id" />
            </tbody>
            <tfoot v-if="outstandingOrders.length > 0">
                <tr class="table-light border-top">
                    <th colspan="9">
                        <div class="table-pagination">
                            <p class="pagi-label">Row per page:</p>

                            <div class="form-group form-group-pagination">
                                <select>
                                    <option>41</option>
                                </select>
                            </div>

                            <p class="pagi-label">1-10 of 254</p>
                            <div class="pagi-nav">
                                <img src="~assets/images/pagi-prev.svg" alt="" />
                                <img src="~assets/images/pagi-next.svg" alt="" />
                            </div>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>

         <!-- Complete Orders-->
        <table v-if="currentTab === 'complete'" class="table table-borderless mb-0">
            <thead class="table-secondary">
                <tr>
                    <th>
                        <p>Order Number</p>
                    </th>
                    <th>
                        <p>Order Type</p>
                    </th>
                    <th>
                        <p>Customer Details</p>
                    </th>
                    <th>
                        <p>Status</p>
                    </th>
                    <th>
                        <p>Amount</p>
                    </th>
                    <th><p>Action</p></th>
                </tr>
            </thead>

            <tbody class="accordion border-top">
                    <tr v-if="completedOrders.length === 0">
                        <td colspan="6">
                            <div class="row">
                                <div class="col-md-3 col-6 mx-auto">
                                    <h1>No Order</h1>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <DesktopSingleOrders v-for="order in completedOrders" :order="order" :key="order.id" />
            </tbody>
            <tfoot v-if="completedOrders.length > 0">
                <tr class="table-light border-top">
                    <th colspan="9">
                        <div class="table-pagination">
                            <p class="pagi-label">Row per page:</p>

                            <div class="form-group form-group-pagination">
                                <select>
                                    <option>41</option>
                                </select>
                            </div>

                            <p class="pagi-label">1-10 of 254</p>
                            <div class="pagi-nav">
                                <img src="~assets/images/pagi-prev.svg" alt="" />
                                <img src="~assets/images/pagi-next.svg" alt="" />
                            </div>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import DesktopSingleOrders from '../components/DesktopSingleOrders';
export default {
    props: ["orders", "pendingOrders", "outstandingOrders", "completedOrders", "curTab", "currentTab"],
    data: () => ({}),
    components: {DesktopSingleOrders}
};
</script>

<style>
    .form-group-pagination {
        width: auto;
    }
</style>
