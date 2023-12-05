<template>
    <div>
        <form class="sign-in order-form" @submit.prevent="saveCakeDetails">
            <div class="form-group">
                <label>Tag Number</label>
                <v-select :options="tagNumbers" v-model="$v.cakeDetails.tag_number.$model"
                          placeholder="Select cake tag number"/>
                <p class="error" v-if="!$v.cakeDetails.tag_number.required && $v.cakeDetails.tag_number.$dirty">Field is
                    required.</p>
            </div>

            <!-- <div class="form-group">
                <label>Icing Flavor</label>
                <v-select :options="icingFlavors" v-model="cakeDetails.cake_icing_flavor"
                          placeholder="Select icing flavor"/>
            </div> -->

            <div class="form-group" v-if="cakeDetails.tag_number.size_id" @click="showVarieties = !showVarieties">
                <a href="#">{{ !showVarieties ? 'Add' : 'Hide' }} variety</a>
                <img src="~/assets/images/plus-btn.svg" v-if="!showVarieties" class="variety-btn" />
                <img src="~/assets/images/minus-btn.svg" v-else class="variety-btn" />
            </div>

            <div class="form-group" v-if="cakeDetails.tag_number.size_id && showVarieties">
                <label>Varieties - ₦{{varietyPrice}} per item</label>
                <v-select multiple :options="varieties" v-model="cakeDetails.varieties"
                          placeholder="Choose varieties"/>
            </div>

            <div class="form-group password">
                <label>Message On Cake</label>
                <textarea placeholder="Message on cake" v-model="cakeDetails.message_on_cake"></textarea>
                <!-- <p class="error" v-if="!$v.cakeDetails.message_on_cake.required && $v.cakeDetails.message_on_cake.$dirty">
                    Field is required.</p> -->
            </div>

            <div class="form-group">
                <label>Message Color</label>
                <v-select multiple :options="messageColor" v-model="cakeDetails.message_color"
                          placeholder="Choose a message color"/>
                <!-- <p class="error" v-if="!$v.cakeDetails.message_color.required && $v.cakeDetails.message_color.$dirty">
                    Field is required.</p> -->
            </div>

            <div class="form-group">
                <label>Reason For Cake</label>
                <v-select :options="purpose" v-model="$v.cakeDetails.reason_for_cake.$model"
                          placeholder="Select reason for cake"/>
                <p class="error"
                   v-if="!$v.cakeDetails.reason_for_cake.required && $v.cakeDetails.reason_for_cake.$dirty">Field is
                    required.</p>
            </div>

            <div class="form-group">
                <label>Extras</label>
                <textarea v-model="cakeDetails.extras"
                          placeholder="Please include any additional information here"></textarea>
            </div>

            <div class="form-group price" v-if="sizes.length > 0">
                <label class="d-flex justify-content-between">Total <span>₦{{total ? total.toLocaleString() : 0}}</span></label>
            </div>

            <div class="btn-row">
                <button @click="$router.back()" class="btn light-grey" type="button">Previous</button>
                <button @click="saveCakeDetails" class="btn" type="submit" :disabled="$v.cakeDetails.$invalid">Next</button>
            </div>
        </form>


    </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import {cakeDetailsValidators} from '../helpers/Validators';

export default {
    data: () => ({
        tagNumbers: [],
        // icingFlavors: [],
        varieties: [],
        sizes: [],
        cakeDetails: {
            tag_number: {},
            // message_on_cake: '',
            // message_color: [],
            reason_for_cake: '',
            extras: '',
            varieties: []
        },
        messageColor: [
            {label: 'Red', value: 'Red'},
            {label: 'White', value: 'White'},
            {label: 'Purple', value: 'Purple'},
            {label: 'Blue', value: 'Blue'}
        ],
        purpose: [
            {label: 'Birthday', value: 'Birthday'},
            {label: 'Anniversary', value: 'Anniversary'},
            {label: 'Wedding', value: 'Wedding'},
            {label: 'Naming Ceremony', value: 'Naming Ceremony'}
        ],
        showVarieties: false
    }),
    validations: cakeDetailsValidators,
    async created() {
        const {data: {data}} = await this.$axios.get('get-cake-properties');
        this.tagNumbers = data.tags.filter(tag => tag.cake && tag.cake.amount !== 0).map(tag => ({
            label: `${tag.tag_number} - ₦${(+tag.cake.amount).toLocaleString()}`,
            value: tag.tag_number,
            amount: tag.cake.amount,
            size_id: tag.cake.size_id,
            type: tag.cake.type
        }));

        // this.icingFlavors = data.flavors.map(flavor => ({label: flavor.name, value: flavor.id}));

        this.varieties = data.varieties.map(variety => ({label: variety.name, value: variety.id}));

        this.sizes = data.sizes;
    },
    async mounted() {
        if (this.$cookies.get('cakeDetails')) {
            this.cakeDetails = this.$cookies.get('cakeDetails');
        }
    },
    methods: {
        saveCakeDetails() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.$cookies.set('cakeDetails', {...this.cakeDetails, sub_total: this.total});
            this.$router.push('/delivery-method');
        }
    },
    computed: {
        total() {
            if (!this.cakeDetails.tag_number.size_id) return 0;

            return +this.cakeDetails.tag_number.amount + (this.varietyPrice * (this.cakeDetails.varieties ? this.cakeDetails.varieties.length : 0));
        },
        varietyPrice() {
            if (this.sizes.length === 0) return 0;

            if(!this.cakeDetails.tag_number.size_id) return 0;

            const size = this.sizes.find(size => size.id === this.cakeDetails.tag_number.size_id);
            return this.cakeDetails.tag_number.type === 1 ? size.variety_classic_price : size.variety_regular_price;
        },
    }
}
</script>

<style scoped lang="scss">
.variety-btn {
    width: 34px;
}
.form-group.price {
    label {
        font-size: 16px;
    }
    span {
        font-weight: 600;
    }
}
</style>
