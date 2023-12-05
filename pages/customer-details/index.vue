<template>
  <section class="customer-details booking-options">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="desk-layout">
            <h1>Customer Details</h1>
            <form @submit.prevent="saveCustomerDetails">
              <div class="d-flex">
                <div class="form-group">
                  <label>First Name</label>
                  <input v-model="$v.customerDetails.customer_first_name.$model" type="text"/>
                  <p class="error" v-if="!$v.customerDetails.customer_first_name.required && $v.customerDetails.customer_first_name.$dirty">Field is required.</p>
                </div>

                <div class="form-group">
                  <label>Last Name</label>
                  <input v-model="$v.customerDetails.customer_last_name.$model" type="text"/>
                  <p class="error" v-if="!$v.customerDetails.customer_last_name.required && $v.customerDetails.customer_last_name.$dirty">Field is required.</p>
                </div>
              </div>

              <div class="form-group">
                <label>Phone Number</label>
                <input v-model="$v.customerDetails.customer_mobile_number.$model" type="text" maxlength="11"/>
                <p class="error" v-if="!$v.customerDetails.customer_mobile_number.required && $v.customerDetails.customer_mobile_number.$dirty">Field is required.</p>
                <p class="error" v-if="!$v.customerDetails.customer_mobile_number.onlyNumbers && $v.customerDetails.customer_mobile_number.$dirty">Please supply a correct phone number.</p>
              </div>

              <div class="form-group">
                <label>Email Address</label>
                <input v-model="$v.customerDetails.customer_email.$model" type="email"/>
                <p class="error" v-if="!$v.customerDetails.customer_email.required && $v.customerDetails.customer_email.$dirty">Field is required.</p>
                <p class="error" v-if="!$v.customerDetails.customer_email.mustBeAnEmail && $v.customerDetails.customer_email.$dirty">Please enter a valid email address.</p>
              </div>

              <div class="d-flex">
                <div class="form-group">
                  <label>Birth Date</label>
                  <input v-model.number="$v.customerDetails.day_of_birth.$model" type="text" maxlength="2"/>
                  <p class="error" v-if="!$v.customerDetails.day_of_birth.required && $v.customerDetails.day_of_birth.$dirty">Field is required.</p>
                  <p class="error" v-if="!$v.customerDetails.day_of_birth.between && $v.customerDetails.day_of_birth.$dirty">Must be between {{$v.customerDetails.day_of_birth.$params.between.min}} and {{$v.customerDetails.day_of_birth.$params.between.max}}</p>
                  <p class="error" v-if="!$v.customerDetails.day_of_birth.onlyNumbers && $v.customerDetails.day_of_birth.$dirty">Please supply a correct phone number.</p>
                </div>

                <div class="form-group">
                  <label>Birth Month</label>
                  <input type="text" v-model="$v.customerDetails.month_of_birth.$model" maxlength="2"/>
                  <p class="error" v-if="!$v.customerDetails.month_of_birth.required && $v.customerDetails.month_of_birth.$dirty">Field is required.</p>
                  <p class="error" v-if="!$v.customerDetails.month_of_birth.between && $v.customerDetails.month_of_birth.$dirty">Must be between {{$v.customerDetails.month_of_birth.$params.between.min}} and {{$v.customerDetails.month_of_birth.$params.between.max}}</p>
                  <p class="error" v-if="!$v.customerDetails.month_of_birth.onlyNumbers && $v.customerDetails.month_of_birth.$dirty">Please supply a correct phone number.</p>
                </div>

                <div class="form-group">
                  <label>Birth Year</label>
                  <input type="text" v-model.number="$v.customerDetails.year_of_birth.$model" maxlength="4"/>
                  <!-- <p class="error" v-if="!$v.customerDetails.year_of_birth.required && $v.customerDetails.year_of_birth.$dirty">Field is required.</p> -->
                  <p class="error" v-if="!$v.customerDetails.year_of_birth.minLength && $v.customerDetails.year_of_birth.$dirty">Must be minimum of {{$v.customerDetails.year_of_birth.$params.minLength.min}} numbers</p>
                  <p class="error" v-if="!$v.customerDetails.year_of_birth.maxLength && $v.customerDetails.year_of_birth.$dirty">Must not be more than {{$v.customerDetails.year_of_birth.$params.maxLength.max}} numbers</p>
                  <p class="error" v-if="!$v.customerDetails.year_of_birth.onlyNumbers && $v.customerDetails.year_of_birth.$dirty">Please supply a correct phone number.</p>
                </div>
              </div>
              <!-- <p class="error-all" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
              <p class="typo__p" v-if="submitStatus === 'OK'">Ok</p> -->
              <div class="btn-row">
                <button @click="$router.back()" class="btn" type="button">Previous</button>
                <button @click="saveCustomerDetails" class="btn" :disabled="$v.customerDetails.$invalid" type="submit">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {customerValidators} from '../../helpers/Validators';

export default {
  data: () => ({
    customerDetails: {
      customer_first_name: '',
      customer_last_name: '',
      customer_mobile_number: '',
      customer_email: '',
      day_of_birth: '',
      month_of_birth: '',
      year_of_birth: ''
    }
  }),
  validations: customerValidators,
  mounted() {
    if (this.$cookies.get('customerDetails')) {
      this.customerDetails = this.$cookies.get('customerDetails');
    }
  },
  methods: {
    saveCustomerDetails() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.submitStatus = 'OK'
        this.$cookies.set('customerDetails', this.customerDetails);
        this.$router.push('/cake-details');
      }

    }
  }
};
</script>
