// import Api from '../apis/Api';
// import Csrf from '../apis/Csrf';
import Cookies from "js-cookie";


export const state = () => ({
    user: {},
    token: '',
    store: {}
});

export const actions = {
    nuxtServerInit({commit}, context) {
        commit('setToken', this.$cookies.get('token'));
        let user = this.$cookies.get('user') || {};
        commit('setUser', user);
        commit('setUserStore', user.store);
    },

    login({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('user/login', payload)
            .then(res => {
                let {data : {data: response}} = res;
                const userRole = Cookies.get('userRoleName');
                const expiresTime = new Date(new Date().getTime() + 10 *  60 * 60 * 1000);

                if (response.user_type.includes(userRole)) {
                    Cookies.set('token', response.auth_token, {expires: expiresTime});
                    Cookies.set('user', JSON.stringify(response.user), {expires: expiresTime});
                    Cookies.set('userType', response.user.role, {expires: expiresTime});
                    commit('storeUser', response.user);
                    commit('storeToken', response.auth_token);
                    commit('setUserStore', response.user.store);
                    resolve(res);
                } else {
                    reject({type: 'roleError', message: 'kindly select your assigned department and login.'});
                }

            })
            .catch(e => {
                console.log(e);
                reject({...e, type: 'loginError'});
            })
        })

    },
    logout({commit}) {
        return new Promise(resolve => {
            Cookies.remove("token");
            Cookies.remove("user");
            Cookies.remove('userType');
            commit('logout');
            resolve(true);
        });
    },
};

export const mutations = {
    setToken: (state, token) => state.token = token,
    setUser: (state, user) => state.user = user,
    storeUser: (state, payload) => state.user = payload,
    storeToken: (state, payload) => state.token = payload,
    setUserStore: (state, payload) => state.store = payload,
    logout: state => {
        state.user = {};
        state.token = '';
        state.store = {};
    },
};

export const getters = {
    getUser: store => store.user,
    getUserStore: store => store.store
}
