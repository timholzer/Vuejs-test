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
    <!-- If I had time to get it to work, starting here would be in the UserData component for proper structure -->
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- if the other button worked, this one would collapse all collapsible elements by having them all have a class that was targeted -->
            <button
              type="button"
              class="btn btn-primary ml-4 mt-2"
              data-toggle="collapse"
              data-target=".task"
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
            <!-- This button is supposed to toggle elements with ID of the same user between collapsed and not collapse -->
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

            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
          </tr>

          <!-- If I had time to get it to work, starting here would be in the Todos component for proper structure -->
          <tr :id="'tasks' + user.id" class="collapse show">
            <th class="row collapse show" :id="'tasks' + user.id"></th>
            <td class="collapse show" :id="'tasks' + user.id"></td>
            <td class="collapse show" :id="'tasks' + user.id">
              Task Id Number
            </td>
            <td class="collapse show" :id="'tasks' + user.id">Name of Task</td>
            <td class="collapse show" :id="'tasks' + user.id">
              Task Completed?
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
          <!-- Todos Component would end here -->
        </tbody>
      </table>
    </div>
    <!-- UserData Component would end here -->
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
    // changes the trues and falses to Yes and No to sound more human ¯\_(ツ)_/¯
    changeBool(yea) {
      if (yea === true) {
        return "Yes";
      } else {
        return "No";
      }
    },
   },

   //Doing an axios get request for the user and todos data

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
        })
      );
  },
};
</script>
