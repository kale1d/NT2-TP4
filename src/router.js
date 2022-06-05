import Vue from "vue";
import VueRouter from "vue-router";

import FormComponent from "./components/FormComponent.vue";
import UserListComponent from "./components/UserListComponent.vue";
import WelcomeComponent from "./components/WelcomeComponent.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: WelcomeComponent },
    { path: "/form", component: FormComponent },
    { path: "/usuarios", component: UserListComponent },
  ],
});
