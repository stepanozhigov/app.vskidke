import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  
const state = {
    action: '',
    employees: []
}
const getters = {
    employees: state => state.employees,
}
const mutations = {
    SET_EMPLOYEES: (state,payload) => (state.employees = payload),
    SET_ACTION: (state,payload) => (state.action = payload),
}
const actions= {
    async getEmployees(context) {
        try {
            axios.defaults.withCredentials = true;
            const resp = await axios.get('/api/employees');
            context.commit('SET_EMPLOYEES',resp.data.data);
            //console.log(resp.data.data);
        } catch(error) {
            //console.log(error);
        }
    },
    async addEmployee(context,employee) {
        context.commit('SET_ACTION','addEmployee');
        try {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            const resp = await axios.post('/api/employees',employee);
            //console.log(resp.data.data);
        } catch(error) {
            //console.log(error);
        }
    },
    async updateEmployee(context,employee) {
        context.commit('SET_ACTION','updateEmployee');
        try {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            const resp = await axios.put('/api/employees/'+employee.id,employee);
            //console.log(resp.data.data);
        } catch(error) {
            //console.log(error);
        }
    },
    async deleteEmployee(context,id) {
        context.commit('SET_ACTION','deleteEmployee');
        try {
            axios.defaults.withCredentials = true
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            const resp = await axios.delete('/api/employees/'+id);
        } catch(error) {
            //console.log(error);
        }
    }
}

export default {
    state,getters,mutations,actions
}