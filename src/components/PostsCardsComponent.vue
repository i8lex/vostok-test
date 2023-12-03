<template>
  <q-card flat bordered class="posts__card">
    <q-btn
      class="posts__btn"
      @click="handleDeletePost(post.id)"
      outline
      rounded
      color="brown-5"
      icon="delete"
    />
    <div @click="navigateToPage(post.id)">
      <q-card-section>
        <h6 class="text-h6 text-white text-weight-bolder q-ma-none">
          {{ post.title }}
        </h6>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p class="text-blue-grey-4 q-mb-none">Автор поста</p>
        <p class="text-blue-grey-1 q-mb-none">{{ post.author }}</p>
      </q-card-section>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.posts {
  &__card {
    position: relative;
    &:hover .posts__btn {
      opacity: 1;
    }
  }
  &__btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";
import { Post } from "@/types";

const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  post: { type: Object as () => Post, required: true },
});
const emit = defineEmits(["handleDeletePost"]);
const handleDeletePost = (postId: number) => {
  emit("handleDeletePost", postId);
};

const navigateToPage = (postId: number) => {
  router.push(`/post/${postId}`);
};
</script>
