import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  
const state = {
    loggedIn: false,
    user: null
}
const getters = {
    loggedIn: state => state.employees,
}
const mutations = {
    SET_LOGGED_IN: (state) => (state.loggedIn = 1),
    SET_USER: (state,payload) => (state.user = payload),
    UNSET_USER: (state) => (state.user = null),
}
const actions= {
    async login(context) {
        try {
            axios.defaults.withCredentials = true;
            const resp = await axios.get('/sanctum/csrf-coockie');
            console.log(resp.data);
            context.commit('SET_USER',resp.data);
            } catch(error) {
            console.log(error);
            } finally {
            console.log('finally');
            }
    },
}

export default {
    state,getters,mutations,actions
}