<template>
  <q-card flat bordered class="post__card">
    <q-card-section>
      <h6 class="text-h6 text-white text-weight-bolder q-ma-none">
        {{ post.title }}
      </h6>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <p class="text-blue-grey-4 q-mb-none">Автор поста</p>
      <p class="text-blue-grey-1 q-mb-none">
        {{ post.author }}
      </p>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <p class="text-blue-grey-4 q-mb-none">Опис</p>
      <p class="text-blue-grey-1 q-mb-none">
        {{ post.description }}
      </p>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.post__card {
  background-color: #3c3e44;
  width: 70dvh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media screen and (max-width: 780px) {
  .post__card {
    max-width: 400px;
  }
}
@media screen and (max-width: 400px) {
  .post__card {
    max-width: 280px;
  }
}
</style>

<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";

const postsStore = usePostsStore();
const { post } = storeToRefs(postsStore);
</script>
