import {required, between, minLength, maxLength, helpers} from 'vuelidate/lib/validators'

const mustBeAnEmail = helpers.regex('alpha', /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const onlyNumbers = helpers.regex('alpha', /^[0-9]*$/);

export const customerValidators = {
    customerDetails: {
        customer_first_name: {required},
        customer_last_name: {required},
        customer_mobile_number: {required, onlyNumbers},
        customer_email: {required, mustBeAnEmail},
        day_of_birth: {required, between: between(1, 31), onlyNumbers},
        month_of_birth: {required, between: between(1, 12), onlyNumbers},
        year_of_birth: {minLength: minLength(4), maxLength: maxLength(4), onlyNumbers}
    }
};

export const cakeDetailsValidators = {
    cakeDetails: {
        tag_number: {required},
        // message_color: {required},
        reason_for_cake: {required},
        // message_on_cake: {required}
    },
};

export const preOrderCakeDetailsValidators = {
    cakeDetails: {
        cake_type: {required},
        cake_shape: {required},
        cake_icing_flavor: {required},
        cake_icing_type: {required},
    },
};

export const addCakeDetailsValidator = {
    cakeDetails: {
        cake_shape: {required},
        cake_flavor: {required},
        cake_size:  {required},
        amount: {required}
    },
};

export const deliveryDetailsValidators = {
    deliveryDetails: {
        delivery_type: {required},
        recipient_first_name: {required},
        recipient_last_name: {required},
        recipient_mobile_number: {required},
        delivery_address: {
            required
            // requiredIf(value, vm) {
            //   console.log(vm);
            //   if (value === '') return true;
            //
            //   return new Promise((resolve, reject) => {
            //       resolve(vm.delivery_type !== "pickup")
            //   })
            // }
        },
        pickup_date: {required},
        pickup_time: {required},
        delivery_date: {required},
    },
};

export const additionalInfoValidator = {
    additionalInfo: {
        reason_for_cake: {required},
        message_on_cake: {required},
        message_color: {required}
    }
};

export const profileValidators = {
    user: {
        first_name: {required},
        last_name: {required},
        email: {required},
        phone_number: {required}
    },
    password: {
        current_password: {required},
        new_password: {required},
        confirm_password: {required}
    }
};

export const paymentValidator = {
    payments: {
        required,
        $each: {
            payment_method: {
                required
            },
            amount_paid: {},
            part: {}
        }
    }
}

export const assignToDispatchValidator = {
    data: {
        rider_id: {required}
    }
}
