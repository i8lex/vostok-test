<template>
  <div class="home">
    <h4 class="text-h4 text-weight-bolder text-center text-white">
      Пости Vostok Bank
    </h4>
    <PostsCards />
    <AddPostModal />
    <PaginationComponent />
  </div>
</template>

<script setup lang="ts">
import PostsCards from "@/components/PostsCardsComponent.vue";
import AddPostModal from "@/components/modal/AddPostModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { usePostsStore } from "@/stores/posts";
import { onBeforeMount } from "vue";

const postsStore = usePostsStore();
onBeforeMount(() => {
  postsStore.loadPosts();
});
</script>
