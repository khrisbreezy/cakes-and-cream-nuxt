<template>
    <section class="customer-details">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Additional Information</h1>

                    <form @submit.prevent="saveAdditionalInfo">
                        <div class="form-group">
                            <label>Design Code (optional)</label>
                            <input type="text" v-model="additionalInfo.picture_code"
                                   placeholder="Please specify fondant design type">
                        </div>

                        <div class="form-group">
                            <label>Printed Out Design (optional)</label>
                            <PictureList :uploaded-files="uploadedFiles"/>
                            <div>
                                <input type="file" multiple ref="popImage" accept="images/*" class="pop-image"
                                       @change="onAddImageHandler">
                                <a href="#" @click="showImageSelector">Upload Image</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Reason For Cake</label>
                            <v-select :options="purpose" v-model="$v.additionalInfo.reason_for_cake.$model"
                                      placeholder="Select reason for cake"/>
                            <p class="error"
                               v-if="$v.additionalInfo.reason_for_cake.dirty && !$v.additionalInfo.reason_for_cake.required">
                                Field is
                                required.</p>
                        </div>

                        <div class="form-group password">
                            <label>Message On Cake</label>
                            <textarea placeholder="Message on cake"
                                      v-model="$v.additionalInfo.message_on_cake.$model"></textarea>
                            <p class="error"
                               v-if="$v.additionalInfo.message_on_cake.dirty && !$v.additionalInfo.message_on_cake.$model.required">
                                Field is required.</p>
                        </div>

                        <div class="form-group">
                            <label>Message Color</label>
                            <v-select multiple :options="messageColor" v-model="$v.additionalInfo.message_color.$model"
                                      placeholder="Choose a message color"/>
                            <p class="error"
                               v-if="$v.additionalInfo.message_color.dirty && !$v.additionalInfo.message_color.required">
                                Field is required.</p>
                        </div>

                        <div class="form-group">
                            <label>Extras</label>
                            <textarea v-model="additionalInfo.extras"
                                      placeholder="Please include any additional information here"></textarea>
                        </div>

                        <div class="btn-row">
                            <button @click="$router.back()" class="btn light-grey" type="button">Previous</button>
                            <button class="btn btn-loading" type="submit" :disabled="$v.additionalInfo.$invalid">
                                {{ loading ? 'Saving' : 'Done' }}
                                <BtnLoader v-if="loading"/>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {additionalInfoValidator} from "../../helpers/Validators";
import PictureList from "../../components/PictureList";
import BtnLoader from "../../components/BtnLoader";

export default {
    components: {BtnLoader, PictureList},
    data: () => ({
        additionalInfo: {
            picture_code: '',
            reason_for_cake: '',
            message_on_cake: '',
            message_color: [],
            extras: ''
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
        uploadedFiles: [],
        loading: false,
        images: []
    }),
    validations: additionalInfoValidator,
    created() {
        if (this.$cookies.get('additionalInformation')) {
            this.additionalInfo = {...this.additionalInfo, ...this.$cookies.get('additionalInformation')};
        }
    },
    methods: {
        showImageSelector() {
            this.$refs.popImage.click();
        },
        onAddImageHandler() {
            this.uploadedFiles = this.$refs.popImage.files;
        },
        createBase64Image(fileObject) {
            const reader  = new FileReader();

            reader.onload = e => {
                this.images.push(e.target.result);
            }
            reader.readAsDataURL(fileObject);
        },
        async saveAdditionalInfo() {
            if (this.$v.$invalid) return null;

            //  Store uploaded printed out pictures to local storage as base64
            this.uploadedFiles.forEach(file => this.createBase64Image(file));
            setTimeout(() => localStorage.setItem('pop', JSON.stringify(this.images)), 500);

            this.$cookies.set('additionalInformation', this.additionalInfo);
            await this.$router.push('/delivery-method');
        }
    },
}
</script>

<style scoped>
.pop-image {
    display: none;
}
</style>
