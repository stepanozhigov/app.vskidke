import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  
const state = {
    employees: []
}
const getters = {
    employees: state => state.employees,
}
const mutations = {
    SET_EMPLOYEES: (state,payload) => (state.employees = payload),
}
const actions= {
    async getEmployees(context) {
        try {
            axios.defaults.withCredentials = true;
            const resp = await axios.get('/api/employees');
            context.commit('SET_EMPLOYEES',resp.data);
            console.log(resp.data);
        } catch(error) {
            console.log(error);
        } finally {
            console.log('finally');
        }
    }
}

export default {
    state,getters,mutations,actions
}