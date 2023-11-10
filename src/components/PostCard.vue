<template>
  <div class="container">
    <q-card
      v-for="post in paginatedPosts"
      :key="post.id"
      flat
      bordered
      class="card"
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

      <q-card-section>
        <h6 class="text-h6 text-white text-weight-bolder q-ma-none">
          {{ post.title }}
        </h6>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p class="text-blue-grey-4 q-mb-none">Автор поста</p>
        <p class="text-blue-grey-1 q-mb-none">{{ post.author }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
}
.card {
  background-color: #3c3e44 !important;
  min-width: 250px;
  max-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
@media screen and (max-width: 1200px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 780px) {
  .card {
    min-width: 200px;
    max-height: 150px;
  }
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 480px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

<script>
import { usePostsStore } from "@/stores/posts";
import { onMounted } from "vue";

export default {
  name: "PostCard",
  data() {
    const postsStore = usePostsStore();

    onMounted(() => {
      postsStore.loadPosts();
    });

    return {
      postsStore,
      hoveredPostId: null,
    };
  },
  methods: {
    onMouseEnter(postId) {
      this.hoveredPostId = postId;
    },
    onMouseLeave() {
      this.hoveredPostId = null;
    },
  },
  computed: {
    paginatedPosts() {
      const currentPage = parseInt(this.$route.query.page) || 1;
      const postsPerPage = 10;
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      return this.postsStore.posts.slice(startIndex, endIndex);
    },
  },
  watch: {
    paginatedPosts() {
      const currentPage = parseInt(this.$route.query.page);
      if (this.paginatedPosts.length === 0) {
        this.$router.push({
          query: { page: currentPage > 1 ? currentPage - 1 : 1 },
        });
      }
    },
  },
};
</script>
