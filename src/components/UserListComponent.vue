<template lang="html">

  <section class="jumbotron jumbotron-fluid">
    <h1>Lista de usuarios</h1>
    <button @click="getUsersXHRCallback" class="btn btn-outline-primary">XHR Callback</button>
    <button @click="getUsersXHRPromise" class="btn btn-outline-secondary">XHR Promise</button>
    <button @click="getUsersFetch" class="btn btn-outline-primary">FETCH</button>
    <button @click="getUsersAxios" class="btn btn-outline-secondary">AXIOS</button>

    <div v-if="!users.length">
      <div class="bg-color"></div>
    </div>


    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Telefono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>

    <pre>{{ !users.length }}</pre>

  </section>

</template>

<script lang="js">

export default {
  name: 'user-list-component',
  props: [],
  mounted() {

  },
  data() {
    return {
      url: 'https://629d30e03798759975e10eeb.mockapi.io/api/v1/users',
      users: [],
    }
  },
  methods: {
    wrapperXHRPromise() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", this.url);
        xhr.addEventListener("load", () => {
          if (xhr.status == 200) {
            let respuesta = JSON.parse(xhr.response);
            resolve(respuesta);
          } else {
            console.error("ERROR XHR CALLBACK (STATUS)", xhr.status);
            let error = {
              title: "ERROR XHR CALLBACK (STATUS)",
              status: xhr.status,
            };
            reject(error);
          }
        });
        xhr.addEventListener("error", (e) => {
          console.error("ERROR XHR CB(Ajax)", e);
          let error = {
            title: "ERROR XHR CB(Ajax)",
            info: e,
          };
          reject(error);
        });
        xhr.send();
      });
    },
    async getUsersXHRPromise() {
      try {
        this.users = [];
        const response = await this.wrapperXHRPromise();
        this.users = response;
      } catch (e) {
        console.error(e, 'xhrpromise')
      }
    },
    getUsersXHRCallback() {
      this.users = [];
      const xhr = new XMLHttpRequest();
      xhr.open("get", this.url);
      xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
          let respuesta = JSON.parse(xhr.response);
          this.users = respuesta;
        } else {
          console.error("xhr error status", xhr.status);
        }
      });
      xhr.addEventListener("error", (e) => {
        console.error("ajax error", e);
      });
      xhr.send();
    },
    async getUsersFetch() {
      try {
        this.users = [];
        const response = await (await fetch(this.url)).json();
        this.users = response;
      } catch (e) {
        console.error(e, 'fetch');
      }
    },
    async getUsersAxios() {
      try {
        this.users = [];
        const { data } = await this.axios(this.url);
        this.users = data;
      } catch (e) {
        console.error(e, 'axios');
      }
    },
  },
  computed: {

  }
}


</script>

<style scoped lang="css">
.jumbotron {
  background-color: lightgrey;
}

.bg-color {
  width: 100vw;
  height: 100vh;
  background-color: pink;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: lightpink;
}
</style>
