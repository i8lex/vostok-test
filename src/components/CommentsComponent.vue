<template>
  <div class="flex justify-center q-mb-lg">
    <div class="comment__container">
      <q-intersection
        v-for="comment in postStore.post.comments"
        transition="scale"
        :threshold="0.5"
        :key="comment.id"
        class="comment__wrapper"
        @click="openDialog[comment.id] = true"
      >
        <q-card dark flat bordered class="q-ma-sm comment__card">
          <q-card-section>
            <div class="text-subtitle2">Comment by {{ comment.author }}</div>
          </q-card-section>
          <q-card-section>
            <p class="text-secondary comment__text">
              {{ comment.comment }}
            </p>
          </q-card-section>
        </q-card>
      </q-intersection>
      <q-dialog
        v-for="comment in postStore.post.comments"
        :key="comment.id"
        v-model="openDialog[comment.id]"
      >
        <q-card dark>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Comment by {{ comment.author }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            {{ comment.comment }}
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment {
  &__card {
    height: 108px;
    overflow: hidden;
    white-space: nowrap;
  }
  &__wrapper {
    height: 108px;
    width: 70dvh;
  }
  &__text {
    overflow: hidden;
    width: 65dvh;
    text-overflow: ellipsis;
  }
}
@media screen and (max-width: 780px) {
  .comment {
    &__wrapper {
      width: 400px;
    }
    &__text {
      width: 370px;
    }
  }
}
@media screen and (max-width: 400px) {
  .comment {
    &__wrapper {
      width: 280px;
    }
    &__text {
      width: 250px;
    }
  }
}
</style>
<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { ref } from "vue";

const openDialog = ref<{ [key: number]: boolean }>({});
const postStore = usePostsStore();
</script>
