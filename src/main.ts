import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { usePostsStore } from "@/stores/posts";
import { useCommentsStore } from "@/stores/comments";
import { createPinia } from "pinia";
import { Notify, Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const pinia = createPinia();
createApp(App)
  .use(pinia)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .mount("#app");

// const commentsSore = useCommentsStore();
// const postsStore = usePostsStore();
