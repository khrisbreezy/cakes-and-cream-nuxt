<template>
    <section class="customer-details">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Profile Details</h1>

                    <form @submit.prevent="updateUpdate">
                        <div class="profile-image-container">
                            <img v-if="!user.image_url" @click="showImageSelector" class="profile-img" src="~assets/images/profile-user.svg" alt=""/>
                             <img v-else @click="showImageSelector" class="profile-img" :src="user.image_url" alt=""/>
                             <input class="input-file-change" ref="fileInput" type="file" @change="updateProfileImage" name="profile-image" accept="image/*" id="profile-image">
                        </div>
                        <div class="d-flex">
                            <div class="form-group">
                                <label>First Name</label>
                                <input v-model="$v.user.first_name.$model" type="text"/>
                                <p class="error"
                                   v-if="!$v.user.first_name.required && $v.user.first_name.$dirty">
                                    Field is required.</p>
                            </div>

                            <div class="form-group">
                                <label>Last Name</label>
                                <input v-model="$v.user.last_name.$model" type="text"/>
                                <p class="error"
                                   v-if="!$v.user.last_name.required && $v.user.last_name.$dirty">
                                    Field is required.</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Phone Number</label>
                            <input v-model="$v.user.phone_number.$model" type="number"/>
                            <p class="error" v-if="!$v.user.phone_number.required && $v.user.phone_number.$dirty">Field
                                is required.</p>
                        </div>

                        <div class="form-group">
                            <label>Email Address</label>
                            <input v-model="$v.user.email.$model" type="email"/>
                            <p class="error" v-if="!$v.user.email.required && $v.user.email.$dirty">Field is
                                required.</p>
                        </div>

                        <button class="btn btn-loading" :disabled="$v.user.$invalid || loading" type="submit">
                            {{ loading ? 'Updating' : 'Update' }}
                            <BtnLoader v-if="loading"/>
                        </button>
                    </form>
                </div>
            </div>


            <div class="row">
                <div class="col">
                    <h1>Update Password</h1>

                    <form @submit.prevent="updatePassword">
                        <div class="form-group">
                            <label>Current Password</label>
                            <input v-model="$v.password.current_password.$model" type="password"/>
                            <p class="error"
                               v-if="!$v.password.current_password.required && $v.password.current_password.$dirty">
                                Field is required.</p>
                        </div>

                        <div class="form-group">
                            <label>New Password</label>
                            <input v-model="$v.password.new_password.$model" type="password"/>
                            <p class="error"
                               v-if="!$v.password.new_password.required && $v.password.new_password.$dirty">
                                Field is required.</p>
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input v-model="$v.password.confirm_password.$model" type="password"/>
                            <p class="error"
                               v-if="!$v.password.confirm_password.required && $v.password.confirm_password.$dirty">
                                Field is required.</p>
                            <p class="error"
                               v-if="passwordMatch()">
                                Passwords do not match.</p>
                        </div>

                        <button class="btn btn-loading" :disabled="$v.password.$invalid || passwordMatch() || loadingPassword" type="submit">
                            {{ loadingPassword ? 'Updating' : 'Update' }}
                            <BtnLoader v-if="loadingPassword"/>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {profileValidators} from '../../helpers/Validators';
import BtnLoader from "../../components/BtnLoader";

export default {
    data: () => ({
        user: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
        },
        password: {
            current_password: '',
            new_password: '',
            confirm_password: ''
        },
        loading: false,
        loadingPassword: false,
        files: [],
    }),
    components: {BtnLoader},
    validations: profileValidators,
    created() {
        this.user = this.$cookies.get('user') || {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
        }
    },
    mounted() {

    },
    methods: {
        async updateUpdate() {
            this.loading = true;
            try {
                await this.$axios.$put('user/profile/update', this.user);
                this.loading = false;
                this.$store.commit('storeUser', this.user);
                this.$toast.success('Profile updated', {duration: 4000});
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        },
        async updatePassword() {
            this.loadingPassword = true;
            try {
                await this.$axios.$put('user/password/update', this.password);
                this.loadingPassword = false;
                this.$toast.success('Password updated', {duration: 4000});
            } catch (e) {
                this.loadingPassword = false;
                this.$toast.error(e.response.data.message, {duration: 4000});
            }
        },
        passwordMatch() {
            return this.$v.password.new_password.$model && this.$v.password.confirm_password.$model && (this.$v.password.new_password.$model !== this.$v.password.confirm_password.$model)
        },
        showImageSelector() {
            this.$refs.fileInput.click();
        },
        createBase64Image(fileObject) {
            return new Promise((resolve, reject) => {
                const reader  = new FileReader();

                reader.onload = e => {
                    resolve(e.target.result);
                }
                reader.readAsDataURL(fileObject);
            })
            
        },
        async updateProfileImage(e) {
            this.files = this.$refs.fileInput.files;
          
            const base64Image = await this.createBase64Image(this.files[0]);
            
            const formData = new FormData();
            formData.append('profile_picture', base64Image);
            try {   
                const {data} = await this.$axios.post('user/profile/update-profile-picture', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                this.user.image_url = data.data.profile_picture;
                this.$store.commit('storeUser', this.user);
                this.$cookies.set('user', JSON.stringify(this.user));
                this.$toast.success(data.message, {duration: 4000});
            } catch(e) {
                console.log(e);
            }
        }
    },
    computed: {}
}
</script>

<style scoped>
.profile-image-container {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 10px;
    /* border: 1px solid; */
    overflow: hidden;
}

.profile-img {
    width: 100%;
}


label.name {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

/* .pencil-icon-img {
    max-width: 17px;
    position: absolute;
    left: 38px;
    top: -14px;
} */

.input-file-change {
    display: none;
}
</style>
