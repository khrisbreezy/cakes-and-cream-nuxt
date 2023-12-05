<template>
     <div class="row pt-3">
        <div v-if="!todoTab" class="col-2 text-center">
            <p>{{order.time_created}}</p>
        </div>
        <div :class="[!todoTab ? 'col-10' : 'col-12']" class="col-10 booking-container" @click="gotoBookingSummary(order)">
            <div class="pre-order-details">
                <img class="ellipse-icon" src="~assets/images/ellipsis.svg" alt="">
                <p class="order-number">Order {{order.order_no}}</p>
                <p class="cake-name">Fruit Cake</p>
                <div class="calendar d-flex align-items-center">
                    <img src="~assets/images/calendar-booking.svg" alt="">
                    <span class="date-display">{{month}} {{currentDate}}, {{year}}</span>
                </div>
                <div class="due-tab d-flex align-items-center">
                    <img src="~assets/images/green-dot.svg" alt="">
                    <span class="due-date">Due Date</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['order', 'todoTab'],
    data: () => ({
        year: "",
        currentDate: "",
        month: "",
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sept", "Oct", "Nov", "Dec"],
    }),
    created() {
        this.getOrderDueDate();
    },
    methods: {
        getOrderDueDate() {
            const d = new Date(this.order.due_date);
            this.month = this.monthNames[d.getMonth()];
            this.currentDate = d.getDate();
            this.year = d.getFullYear();
        },
        gotoBookingSummary(order) {
            this.$cookies.set('order-response', order);
            // this.$router.push('/bookings/booking-summary');
            this.$router.push(`/bookings/${order.id}`);
        }
    }
}
</script>