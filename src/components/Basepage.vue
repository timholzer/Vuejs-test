<template>
  <div class="base">
    <div>
      <h1 class="base-header">Employee Todo List</h1>
      <p class="base-descript">
        Click on the employees to see what tasks they have and haven't done.
      </p>
    </div>
  </div>
  <div>
    <div class="container">
      <table class="table table-striped" align="right">
        <thead>
          <tr>
            <button
              type="button"
              class="btn btn-primary ml-4 mt-2"
              data-toggle="modal"
              data-target="#myModal"
            >
              Collapse all
            </button>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody v-for="user in users" v-bind:key="user.id">
          <tr>
            <!-- This button is supposed to toggle elements with ID of same user between collapsed and not collapse -->
            <button
              type="button"
              class="btn btn-primary ml-4 mt-2 btn-light btn-outline-primary"
              data-toggle="collapse"
              :data-target="'#tasks' + user.id"
              role="button"
              aria-expanded="false"
              :aria-controls="'#tasks' + user.id"
            >
              Toggle {{ user.name }}'s tasks
            </button>

            <!-- <b-button v-b-toggle="'tasks' + user.id" class="m-1">Toggle {{user.name}}'s tasks</b-button> -->
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
          </tr>

          <tr :id="'tasks' + user.id" class="collapse show">
            <th class="row collapse show" :id="'tasks' + user.id"></th>
            <td class="collapse show" :id="'tasks' + user.id"></td>
            <td class="collapse show" :id="'tasks' + user.id">
              Task Id Number
            </td>
            <td class="collapse show" :id="'tasks' + user.id">Name of Task</td>
            <td class="collapse show" :id="'tasks' + user.id">
              Task Completed
            </td>
          </tr>

          <tr
            v-for="task in tasks"
            v-bind:key="task.completed"
            :id="'tasks' + user.id"
            class="collapse show"
          >
            <th
              class="row align-center collapse show"
              v-if="task.userId === user.id"
              :id="'tasks' + user.id"
            ></th>
            <td
              v-if="task.userId === user.id"
              class="collapse show"
              :id="'tasks' + user.id"
            ></td>
            <td
              v-if="task.userId === user.id"
              class="collapse show"
              :id="'tasks' + user.id"
            >
              {{ task.id }}
            </td>
            <td
              v-if="task.userId === user.id"
              class="collapse show"
              :id="'tasks' + user.id"
            >
              {{ task.title }}
            </td>
            <td
              v-if="task.userId === user.id"
              class="collapse show"
              :id="'tasks' + user.id"
            >
              {{ changeBool(task.completed) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// Components: {
//   UserData
//   },
//import  UserData  from '../components/UserData.vue';
import axios from "axios";
export default {
  name: "Tasks",
  data() {
    return {
      users: null,
      tasks: null,
    };
  },
  methods: {
    changeBool(yea) {
      if (yea === true) {
        return "Yes";
      } else {
        return "No";
      }
    },
    buttonToggle() {},
  },

  created: function() {
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
      ])
      .then(
        axios.spread((tasks, users) => {
          this.users = users.data;
          this.tasks = tasks.data;

          if (this.tasks.completed == "true") {
            this.tasks.completed = "Yes";
          } else {
            this.tasks.completed = "No";
          }
        })
      );
  },
};
</script>
