<template>
    <form class="sign-in order-form" @submit.prevent="saveCakeDetails">
        <div class="form-group">
            <label>Type</label>
            <v-select :options="cakeTypes" v-model="$v.cakeDetails.cake_type.$model" placeholder="Select a cake type"/>
            <p class="error" v-if="$v.cakeDetails.cake_type.$dirty && !$v.cakeDetails.cake_type.required">Field is
                required.</p>
        </div>

        <div class="form-group">
            <label>Shape</label>
            <v-select :options="cakeShapes" v-model="$v.cakeDetails.cake_shape.$model" placeholder="Select cake shape"/>
            <p class="error" v-if="$v.cakeDetails.cake_shape.$dirty && !$v.cakeDetails.cake_shape.required">Field is
                required.</p>
        </div>

        <div class="form-group password">
            <label>Size</label>
            <label class="radio-wrapper">6 inch
                <input v-model="cakeDetails.cake_size" value="6" type="radio" name="cake-size">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">8 inch
                <input v-model="cakeDetails.cake_size" value="8" type="radio" name="cake-size">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">10 inch
                <input v-model="cakeDetails.cake_size" value="10" type="radio" name="cake-size">
                <span class="checkmark"></span>
            </label>
            <label class="radio-wrapper">12 inch
                <input v-model="cakeDetails.cake_size" value="12" type="radio" name="cake-size">
                <span class="checkmark"></span>
            </label>
        </div>

        <div class="form-group">
            <label>Icing Type</label>
            <v-select :options="icingTypes" v-model="$v.cakeDetails.cake_icing_type.$model"
                      placeholder="Select icing type"/>
            <p class="error" v-if="$v.cakeDetails.cake_icing_type.$dirty && !$v.cakeDetails.cake_icing_type.required">
                Field is
                required.</p>
        </div>

        <div class="form-group" v-if="cakeDetails.cake_icing_type.value === 'fondant'">
            <label>Fondant Design</label>
            <v-select :options="fondantDesigns" v-model="cakeDetails.cake_fondant_design"
                      placeholder="Select fondant design"/>
        </div>

        <div class="form-group"
             v-if="cakeDetails.cake_icing_type.value === 'fondant' && cakeDetails.cake_fondant_design.value === 'other'">
            <input type="text" v-model="cakeDetails.fondant_design_other"
                   placeholder="Please specify fondant design type">
        </div>

        <div class="form-group">
            <label>Icing Flavor</label>
            <v-select :options="icingFlavors" v-model="$v.cakeDetails.cake_icing_flavor.$model"
                      placeholder="Select icing flavor"/>
            <p class="error"
               v-if="$v.cakeDetails.cake_icing_flavor.$dirty && !$v.cakeDetails.cake_icing_flavor.required">Field is
                required.</p>
        </div>

        <div class="form-group" @click="showVarieties = !showVarieties">
            <a href="#">{{ !showVarieties ? 'Add' : 'Hide' }} variety</a>
            <img src="~/assets/images/plus-btn.svg" v-if="!showVarieties" class="variety-btn"/>
            <img src="~/assets/images/minus-btn.svg" v-else class="variety-btn"/>
        </div>

        <div class="form-group" v-if="showVarieties">
            <label>Varieties</label>
            <v-select multiple :options="varieties" v-model="cakeDetails.varieties"
                      placeholder="Choose varieties"/>
        </div>

        <div class="btn-row">
            <button @click="$router.back()" class="btn light-grey" type="button">Previous</button>
            <button class="btn" type="submit" :disabled="$v.cakeDetails.$invalid">Next</button>
        </div>
    </form>
</template>

<script>
import {preOrderCakeDetailsValidators} from '../helpers/Validators';

export default {
    data: () => ({
        cakeDetails: {
            cake_type: '',
            cake_shape: '',
            cake_size: '6',
            cake_icing_type: '',
            cake_fondant_design: '',
            fondant_design_other: '',
            cake_icing_flavor: '',
            varieties: []
        },
        cakeTypes: [],
        cakeShapes: [],
        varieties: [],
        icingTypes: [
            {label: 'None', value: 'none'},
            {label: 'Butter', value: 'butter'},
            {label: 'Fondant', value: 'fondant'},
            {label: 'Hybrid', value: 'hybrid'},
        ],
        fondantDesigns: [
            {label: 'Figure (animal, sports)', value: 'figure'},
            {label: 'Letters', value: 'letters'},
            {label: 'Number', value: 'number'},
            {label: 'Roses', value: 'roses'},
            {label: 'Other', value: 'other'},
        ],
        icingFlavors: [
            {label: 'None', value: 'none'},
            {label: 'Chocolate', value: 'chocolate'},
            {label: 'Cream Cheese', value: 'cream cheese'},
            {label: 'Cinnamon Cream Cheese', value: 'cinnamon cream value'},
            {label: 'Vanilla', value: 'vanilla'},
        ],
        showVarieties: false
    }),
    validations: preOrderCakeDetailsValidators,
    async created() {
        const {data: {data}} = await this.$axios.get('get-pre-order-cake-properties');
        this.cakeShapes = data.shapes.map(shape => ({label: shape.name, value: shape.id}));
        this.varieties = data.varieties.map(variety => ({label: variety.name, value: variety.id}));
        this.cakeTypes = Object.keys(data.cake_types).map((key, index) => ({label: data.cake_types[key], value: index + 1}));
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
