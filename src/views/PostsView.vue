<template>
  <div class="home">
    <h4 class="text-h4 text-weight-bolder text-center text-white">
      Пости Vostok Bank
    </h4>
    <div class="posts__container">
      <PostsCards
        v-for="post in paginatedPosts"
        :post="post"
        :key="post.id"
        @handleDeletePost="handleDeletePost"
      />
    </div>
    <q-btn
      label="Add post"
      color="primary"
      @click="handleModal(true)"
      class="q-ma-md"
    />
    <AddPostModal
      :prompt="showModal"
      @update:prompt="handleModal"
      @submit="handleFormSubmit"
    />
    <PaginationComponent />
  </div>
</template>

<style lang="scss" scoped>
.posts {
  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
  }
  &__card {
    background-color: #3c3e44;
    min-width: 250px;
    max-height: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }
}

@media screen and (max-width: 1200px) {
  .posts {
    &__container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
@media screen and (max-width: 780px) {
  .posts {
    &__posts-card {
      min-width: 200px;
      max-height: 150px;
    }
    &__container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
@media screen and (max-width: 480px) {
  .posts {
    &__container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

<script setup lang="ts">
import PostsCards from "@/components/PostsCardsComponent.vue";
import AddPostModal from "@/components/modal/AddPostModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { usePostsStore } from "@/stores/posts";
import { onBeforeMount, ref, computed, watch } from "vue";
import { Post } from "@/types";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);
const showModal = ref(false);
const currentPage = ref(
  router.currentRoute.value.query.page
    ? parseInt(router.currentRoute.value.query.page.toString())
    : 1
);

const paginatedPosts = computed(() => {
  const postsPerPage = 10;
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return posts.value.slice(startIndex, endIndex);
});
const handleModal = (value: boolean) => {
  showModal.value = value;
};

const handleFormSubmit = (value: Post) => {
  postsStore.addPost(value);
};

const handleDeletePost = (id: number) => {
  postsStore.deletePost(id);
};

onBeforeMount(() => {
  postsStore.loadPosts();
});

watch(
  () => router.currentRoute.value.query.page,
  (newVal) => {
    currentPage.value = newVal ? parseInt(newVal.toString()) : 1;
  }
);

watch(
  () => paginatedPosts.value.length,
  (newVal) => {
    if (newVal === 0) {
      router.push({
        query: {
          page: currentPage.value > 1 ? currentPage.value - 1 : 1,
        },
      });
    }
  }
);
</script>
