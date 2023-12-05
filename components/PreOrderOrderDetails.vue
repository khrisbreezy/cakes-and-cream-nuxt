<template>
    <form class="sign-in order-form" @submit.prevent="saveCakeDetails">
        <div class="form-group">
            <label class="label-heading">Cake Type</label>
            <label class="radio-wrapper">Fruit
                <input v-model="cakeDetails.cake_type" value="fruit" type="radio" name="cake-type">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Sponge
                <input v-model="cakeDetails.cake_type" value="sponge" type="radio" name="cake-type">
                <span class="checkmark"></span>
            </label>  
        </div>

        <div class="form-group">
            <label class="label-heading">Cake Category</label>
            <label class="radio-wrapper">Basic
                <input v-model="cakeDetails.cake_category" value="basic" type="radio" name="cake-category">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Clasic
                <input v-model="cakeDetails.cake_category" value="classic" type="radio" name="cake-category">
                <span class="checkmark"></span>
            </label>  
        </div>

        <div class="form-group">
            <label class="label-heading">Icing Type</label>
            <label class="radio-wrapper">Butter Cream
                <input v-model="cakeDetails.icing_type" value="butter cream" type="radio" name="icing-type">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Fondant
                <input v-model="cakeDetails.icing_type" value="fondant" type="radio" name="icing-type">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Un-iced
                <input v-model="cakeDetails.icing_type" value="un-iced" type="radio" name="icing-type">
                <span class="checkmark"></span>
            </label>    
        </div>

        <div v-if="cakeDetails.icing_type === 'butter cream'" class="form-group">
            <label class="label-heading">Icing Category</label>
            <label class="radio-wrapper">Basic/Regular
                <input v-model="cakeDetails.icing_category" value="basic/regular" type="radio" name="icing-category">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Classic
                <input v-model="cakeDetails.icing_category" value="clasic" type="radio" name="icing-category">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">SMBC
                <input v-model="cakeDetails.icing_category" value="smbc" type="radio" name="icing-category">
                <span class="checkmark"></span>
            </label>    
        </div>

        <div class="form-group">
            <label class="label-heading">Covering Type</label>
            <label class="radio-wrapper">Partly Iced
                <input v-model="cakeDetails.covering_type" value="partly iced" type="radio" name="covering-type">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Semi Naked
                <input v-model="cakeDetails.covering_type" value="semi Naked" type="radio" name="covering-type">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">Fully Iced
                <input v-model="cakeDetails.covering_type" value="fully iced" type="radio" name="covering-type">
                <span class="checkmark"></span>
            </label>    
        </div>

        <div class="form-group">
            <label>Shape</label>
            <v-select :options="cakeShapes" v-model="$v.cakeDetails.cake_shape.$model" placeholder="Select cake shape"/>
            <p class="error" v-if="$v.cakeDetails.cake_shape.$dirty && !$v.cakeDetails.cake_shape.required">Field is
                required.</p>
        </div>

        <div class="form-group">
            <label>Size</label>
            <v-select :options="cakeSize" v-model="$v.cakeDetails.cake_size.$model" placeholder="Select cake shape"/>
            <p class="error" v-if="$v.cakeDetails.cake_size.$dirty && !$v.cakeDetails.cake_size.required">Field is
                required.</p>
        </div>

        <div class="form-group">
            <label>Flavor</label>
            <v-select :options="flavors" v-model="$v.cakeDetails.cake_flavor.$model" placeholder="Select cake shape"/>
            <p class="error" v-if="$v.cakeDetails.cake_flavor.$dirty && !$v.cakeDetails.cake_flavor.required">Field is
                required.</p>
        </div>

        <div class="form-group">
            <label>Amount(₦)</label>
            <input type="number" name="amount" v-model="$v.cakeDetails.amount.$model" id="">
            <p class="error" v-if="$v.cakeDetails.amount.$dirty && !$v.cakeDetails.amount.required">Field is
                required.</p>
        </div>

        <div class="form-group" @click="showVarieties = !showVarieties">
            <a href="#">{{ !showVarieties ? 'Add' : 'Hide' }} Variety</a>
            <img src="~/assets/images/plus-btn.svg" v-if="!showVarieties" class="variety-btn"/>
            <img src="~/assets/images/minus-btn.svg" v-else class="variety-btn"/>
        </div>

            <div class="form-group" v-if="showVarieties">
            <label>Varieties</label>
            <v-select multiple :options="varieties" v-model="cakeDetails.varieties"
                    placeholder="Choose varieties"/>
        </div>

        <div class="form-group" @click="showTopper = !showTopper">
            <a href="#">{{ !showTopper ? 'Add' : 'Hide' }} Topper</a>
            <img src="~/assets/images/plus-btn.svg" v-if="!showTopper" class="variety-btn"/>
            <img src="~/assets/images/minus-btn.svg" v-else class="variety-btn"/>
        </div>

        <div class="form-group" v-if="showTopper">
            <label>Topper</label>
            <v-select multiple :options="toppers" v-model="cakeDetails.toppers"
                    placeholder="Choose varieties"/>
        </div>


        <div class="text-right mt-5">
            <!-- <button @click="$router.back()" class="btn light-grey" type="button">Previous</button> -->
            <button class="btn" type="submit" :disabled="$v.cakeDetails.$invalid">Next</button>
        </div>
    </form>
</template>

<script>
import {addCakeDetailsValidator} from '../helpers/Validators';

export default {
    data: () => ({
        cakeDetails: {
            cake_type: 'fruit',
            cake_category: 'basic',
            icing_type: 'butter cream',
            icing_category: 'basic/regular',
            covering_type: 'partly iced',
            amount: '',
            cake_shape: '',
            cake_flavor: '',
            cake_size: '',
            varieties: '',
            toppers: ''
        },
        cakeShapes: [],
        varieties: [],
        toppers: [
            {label: 'Candles', value: 'candles'},
        ],
        flavors: [
            {label: 'Chocolate', value: 'chocolate'},
            {label: 'Cream Cheese', value: 'cream cheese'},
            {label: 'Cinnamon Cream Cheese', value: 'cinnamon cream value'},
            {label: 'Vanilla', value: 'vanilla'},
        ],
        cakeSize: [
            {label: '6 inch', value: '6 inch'},
            {label: '7 inch', value: '7 inch'},
            {label: '8 inch', value: '8 inch'},
            {label: '9 inch', value: '9 inch'},
            {label: '10 inch', value: '10 inch'},
        ],
        cakeTypes: [],
        showVarieties: false,
        showTopper: false
        
    }),
    validations: addCakeDetailsValidator,
    async created() {
        const {data: {data}} = await this.$axios.get('get-pre-order-cake-properties');
        this.cakeShapes = data.shapes.map(shape => ({label: shape.name, value: shape.id}));
        this.varieties = data.varieties.map(variety => ({label: variety.name, value: variety.id}));
        // this.cakeTypes = Object.keys(data.cake_types).map((key, index) => ({label: data.cake_types[key], value: index + 1}));
    },
    mounted() {
        if (this.$cookies.get('cakeDetails')) {
            this.cakeDetails = {...this.cakeDetails, ...this.$cookies.get('cakeDetails')};
        }
    },
    methods: {
          saveCakeDetails() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return null;
            }
            this.$cookies.set('cakeDetails', this.cakeDetails);
            this.$router.push('/additional-information');
        }
    }
}
</script>

<style>
.label-heading {
    margin-bottom: 8px;
}
</style>