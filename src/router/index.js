import Vue from "vue";
import Router from "vue-router";
import demo2 from "../pages/demo2/index.vue";

import erollPoster from "../pages/eroll_poster/index.vue";
import index from "../pages/index/index.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/pages/demo2/main",
      name: "demo2",
      component: demo2
    },
    {
      path: "/pages/eroll_poster/main",
      name: "erollPoster",
      component: erollPoster
    }
  ]
});
