import axios from 'axios'
axios.defaults.withCredentials = true;
  
  const state = {
    employees: [],
  },
  const getters = {
    employees: state => state.employees,
  },
  const mutations = {
    SET_EMPLOYEES: (state,payload) => (state.employees = payload),
  },
  const actions= {
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
  }

  export default {
      state, getters,mutatations,actions
  }