import axios from 'axios';
//uses and api to return 20 random users
export default {
  getUsers: function () {
    return axios.get('https://jsonplaceholder.typicode.com/users');
  },
  getTodos: function () {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
  }
};