<template>
  <div class="home">
    <h4 class="text-h4 text-weight-bolder text-white">Пости Vostok Bank</h4>
    <PostCard />
    <PromptModal />
    <PaginationComponent />
  </div>
</template>

<script lang="ts">
import PostCard from "@/components/PostCard.vue";
import PromptModal from "@/components/modal/PromptModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
export default {
  name: "PostsView",
  components: {
    PaginationComponent,
    PostCard,
    PromptModal,
  },
};
</script>
