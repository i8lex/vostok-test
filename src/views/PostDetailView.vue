<template>
  <div class="post">
    <div class="q-ma-md-xs xl-hide lg-hide md-hide">
      <q-btn round color="brown-5" icon="reply" @click="router.back" />
    </div>
    <div
      class="text-h4 text-weight-bolder text-center text-white q-ma-xl-lg q-ma-md-xs relative-position"
    >
      <div class="absolute-top-left q-ma-xl-lg sm-hide xs-hide">
        <q-btn round color="brown-5" icon="reply" @click="router.back" />
      </div>
      <h4>Деталі поста #{{ postsStore.post.id }}</h4>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Add comment" color="primary" @click="handleModal(true)" />
    </div>
    <PostCardComponent />
    <AddCommentModal
      :showModal="showModal"
      @update:showModal="handleModal"
      @handleFormSubmit="handleFormSubmit"
    />
    <CommentsComponent />
  </div>
</template>

<style lang="scss" scoped>
.post {
  margin-top: 20px;
}
</style>

<script setup lang="ts">
import PostCardComponent from "@/components/PostCardComponent.vue";
import { usePostsStore } from "@/stores/posts";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import AddCommentModal from "@/components/modal/AddCommentModal.vue";
import CommentsComponent from "@/components/CommentsComponent.vue";
import { Comment } from "@/types";

const router = useRouter();
const postsStore = usePostsStore();
const showModal = ref(false);
const handleModal = (value: boolean) => {
  showModal.value = value;
};

const handleFormSubmit = (data: Comment, postId: number) => {
  postsStore.addComment(data, postId);
};
onMounted(() => {
  const { id: pageId } = router.currentRoute.value.params;
  postsStore.loadPost(+pageId);
});
</script>
