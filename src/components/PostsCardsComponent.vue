<template>
  <div class="posts__container">
    <q-card
      v-for="post in paginatedPosts"
      :key="post.id"
      flat
      bordered
      class="posts__card"
      @mouseenter="onMouseEnter(post.id)"
      @mouseleave="onMouseLeave"
    >
      <q-btn
        class="absolute-top-right q-ma-sm z-max"
        @click="postsStore.deletePost(post.id)"
        outline
        rounded
        color="brown-5"
        icon="delete"
        v-if="hoveredPostId === post.id"
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
  </div>
</template>

<style lang="scss">
.posts {
  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
  }
  &__card {
    background-color: #3c3e44 !important;
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
import { usePostsStore } from "@/stores/posts";
import { computed, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";

const postsStore = usePostsStore();
const router = useRouter();
const currentPage = ref(
  router.currentRoute.value.query.page
    ? parseInt(router.currentRoute.value.query.page.toString())
    : 1
);

const hoveredPostId: Ref<null | number> = ref(null);
const onMouseEnter = (postId: number) => {
  hoveredPostId.value = postId;
};
const onMouseLeave = () => {
  hoveredPostId.value = null;
};

const navigateToPage = (postId: number) => {
  router.push(`/post/${postId}`);
};
const paginatedPosts = computed(() => {
  const postsPerPage = 10;
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return postsStore.posts.slice(startIndex, endIndex);
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
