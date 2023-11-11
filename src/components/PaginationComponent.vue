<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPage"
      color="brown-5"
      :max="getPageQuantity()"
      :max-pages="6"
      boundary-numbers
      @click="navigateToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePostsStore } from "@/stores/posts";
import { useRouter } from "vue-router";

const postsStore = usePostsStore();
const router = useRouter();
const currentPage = ref(1);

onMounted(() => {
  currentPage.value = router.currentRoute.value.query.page
    ? parseInt(router.currentRoute.value.query.page.toString())
    : 1;
});
const getPageQuantity = () => {
  return Math.ceil(postsStore.posts.length / 10);
};
const navigateToPage = () => {
  router.push({
    query: {
      page: currentPage.value,
    },
  });
};
</script>
