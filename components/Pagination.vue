<template>
    <div>
        <template>
            <section v-if="orderMeta.total > 0" class="align-items-center">
                    <!-- <div class="container">
                        <div class="row mt-3">
                            <div class="col">
                            
                            </div>
                        </div>
                    </div> -->
                    <div class="container d-flex align-items-center justify-content-between">
                        <p class="mb-0">Page {{orderMeta.current_page}}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="mb-0">Showing {{ orderMeta.count }} of {{ orderMeta.total }} entries </p>
                        </div>
                        <div>
                            <ul class="pagination">
                                <li class="page-item" :class="{active: orderMeta.current_page > 1}">
                                    <a href="#" class="lack page-link" :disabled="isFirstOrLast" @click.prevent="loadPage(false)">
                                        <img src="~assets/images/prev-white.svg" v-if="orderMeta.current_page > 1">
                                        <img src="~assets/images/prev.svg" v-else>
                                    </a>
                                </li>

                                <li class="page-item" :class="{active: orderMeta.current_page < orderMeta.total_pages}">
                                    <a href="#" class="lack page-link" :disabled="isFirstOrLast" @click.prevent="loadPage(true)">
                                        <img src="~assets/images/next-white.svg" v-if="orderMeta.current_page < orderMeta.total_pages">
                                        <img src="~assets/images/next.svg" v-else>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </section>
        </template>
        <!-- <template>
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
        </template> -->

    </div>
</template>

<script>
export default {
    props: ['orderMeta', 'orderLink'],
    data: () => ({
        showPagination: true,
    }),
    methods: {
        async loadPage(next = true) {
            if (
                (next && this.orderMeta.current_page === this.orderMeta.total_pages)
                || (!next && this.orderMeta.current_page === 1)
            ) {
                return;
            }
                
            this.$emit('pageLoading', true);
            try {
                const link = next
                    ? `${this.orderLink}&page=${this.orderMeta.current_page + 1}`
                    : `${this.orderLink}&page=${this.orderMeta.current_page - 1}`;

                const {data} = await this.$axios.get(link);
                this.$emit('onPaginationEvent', data);
                this.$emit('pageLoading', false);
            } catch (e) {
                console.log(e);
                this.$emit('pageLoading', false);
            }
        }
    },
    computed: {
        isFirstOrLast() {
            return (next = true) => {
                if (
                    (next && this.orderMeta.current_page === this.orderMeta.total_pages)
                    || (!next && this.orderMeta.current_page === 1)
                ) {
                    return true;
                }

                return false;
            }
            
        }
    }
}
</script>

