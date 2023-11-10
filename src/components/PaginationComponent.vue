<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPage"
      color="brown-5"
      :max="getPageQuantity"
      :max-pages="6"
      boundary-numbers
      @click="setRouterQuery"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { usePostsStore } from "@/stores/posts";
import { useRouter } from "vue-router";

export default {
  name: "PaginationComponent",
  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    const currentPage = ref(1);
    onMounted(() => {
      currentPage.value = router.currentRoute.value.query.page || 1;
    });
    return {
      postsStore,
      currentPage,
    };
  },
  computed: {
    getPageQuantity() {
      return Math.ceil(this.postsStore.posts.length / 10);
    },
  },
  methods: {
    setRouterQuery() {
      this.$router.push({
        query: {
          page: this.currentPage,
        },
      });
    },
  },
};
</script>
