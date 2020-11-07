import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  
const state = {
    token: null,
    user: null
}
const getters = {
    token: state => state.token,
}
const mutations = {
    SET_TOKEN: (state,payload) => (state.token = payload),
    SET_USER: (state,payload) => (state.user = payload),
    UNSET_USER: (state) => (state.user = null),
}
const actions= {
    loginUser(context,form) {
        return new Promise((resolve, reject) => {
            axios.post('api/login',form).then(response => {
                context.commit('SET_TOKEN', response.data)
                resolve(response);
            }, error => {
                reject(error);
            })
        })
    },
        registerUser(context,form) {
            return new Promise((resolve, reject) => {
                axios.post('api/register',form).then(response => {
                    console.log(response)
                    context.commit('SET_USER', response)
                    resolve(response);
                }, error => {
                    reject(error);
                })
            })
        },
}

export default {
    state,getters,mutations,actions
}