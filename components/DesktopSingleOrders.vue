<template>
     <tr class="border-top">
        <td>
            <p>{{order.order_no}}</p>
        </td>
        <td>
            <p v-if="order.type === 'express_order'">Express Order</p>
            <p v-else>Pre Order</p>
        </td>
        <td>
            <p>{{order.customer.first_name}} {{order.customer.last_name}}</p>
            <p class="text-smal">{{order.customer.mobile_number}}</p>
        </td>
        <td>
            <p v-if="order.payment_status === 'paid'"><span class="status-color green">&#9679&nbsp;paid</span> </p>
            <p v-else-if="order.payment_status === 'pending payment'"><span class="status-color red">&#9679&nbsp;Pending </span> </p>
            <p v-else><span class="status-color orange">&#9679&nbsp;Outstanding</span> </p>
            <!-- <p class="text-smal">paid on 15/APR/2020 </p> -->
        </td>
        <td>
            <p>₦{{order.sub_total}}</p>
        </td>
        <td>
            <p><a class="txt-view" href="#">View More</a> </p>
        </td>
    </tr>
</template>

<script>
export default {
    props: ['order'],
    data: () => ({

    }),
    
}
</script>