<template>
  <div class="post">
    <div class="q-ma-md-xs xl-hide lg-hide md-hide">
      <q-btn round color="brown-5" icon="reply" @click="navigateToPage" />
    </div>
    <div
      class="text-h4 text-weight-bolder text-center text-white q-ma-xl-lg q-ma-md-xs relative-position window-widt"
    >
      <div class="absolute-top-left q-ma-xl-lg sm-hide xs-hide">
        <q-btn round color="brown-5" icon="reply" @click="navigateToPage" />
      </div>
      <h4>Деталі поста #{{ postsStore.post.id }}</h4>
    </div>
    <PostCardComponent />
    <AddCommentModal />
    <CommentsComponent />
  </div>
</template>

<style lang="scss">
.post {
  margin-top: 20px;
}
</style>

<script setup lang="ts">
import PostCardComponent from "@/components/PostCardComponent.vue";
import { usePostsStore } from "@/stores/posts";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import AddCommentModal from "@/components/modal/AddCommentModal.vue";
import CommentsComponent from "@/components/CommentsComponent.vue";

const router = useRouter();
const postsStore = usePostsStore();
onMounted(() => {
  const { id: pageId } = router.currentRoute.value.params;
  postsStore.loadPost(+pageId);
});

const navigateToPage = () => {
  router.push({
    path: `/?page=1`,
  });
};
</script>
