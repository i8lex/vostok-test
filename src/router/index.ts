import { createRouter, createWebHistory } from "vue-router";
import PostsView from "@/views/PostsView.vue";
import PostDetailView from "@/views/PostDetailView.vue";

const routes = [
  {
    path: "/",
    component: PostsView,
  },
  {
    path: "/post/:id",
    component: PostDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
