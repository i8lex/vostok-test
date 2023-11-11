<template>
  <q-card
    class="comment__card text-white"
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
  >
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!--      {{ lorem }}-->
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.comment__card {
  width: 70%;
}
</style>
<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";

export default {
  data() {
    const postStore = usePostsStore();
    return {};
  },
};
</script>
