import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.withCredentials = true;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: [],
  },
  getters: {
    employees: state => state.employees,
  },
  mutations: {
    SET_EMPLOYEES: (state,payload) => (state.employees = payload),
  },
  actions: {
    async getEmployees() {
      try {
        const resp = await axios.get('/employees');
        console.log(resp.data);
      } catch(error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }
  },
  modules: {
  }
})
