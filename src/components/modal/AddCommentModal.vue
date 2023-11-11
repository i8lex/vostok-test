<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Add comment" color="primary" @click="prompt = true" />

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px; background-color: #272b33">
        <q-card-section>
          <div class="text-h6 text-white">Add comment</div>
        </q-card-section>

        <div class="q-pa-md" style="max-width: 300px">
          <form
            @submit.prevent.stop="onSubmit"
            @cancel.prevent.stop="onCancel"
            class="q-gutter-md"
          >
            <q-input
              dark
              ref="authorRef"
              filled
              v-model="author"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="authorRules"
            />
            <q-input
              dark
              ref="commentRef"
              filled
              type="textarea"
              v-model="comment"
              label="Your comment"
              hint="Enter your comment"
              lazy-rules
              :rules="commentRules"
            />

            <div>
              <q-btn label="Add comment" type="submit" color="primary" />
              <q-btn
                label="Cancel"
                type="button"
                @click="onCancel"
                color="primary"
                flat
                class="q-ml-sm text-white"
              />
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useQuasar, QInput } from "quasar";
import { usePostsStore } from "@/stores/posts";

const $q = useQuasar();
const postStore = usePostsStore();
const author = ref("");
const authorRef: Ref<QInput | null> = ref(null);
const comment = ref("");
const commentRef: Ref<QInput | null> = ref(null);
const prompt = ref(false);
const authorRules = [
  (val: string) => (val && val.length > 0) || "Please type something",
  (val: string) => (val && val.length >= 3) || "Minimum 3 characters",
  (val: string) => (val && val.length <= 30) || "Maximum 30 characters",
];

const commentRules = [
  (val: string) => (val && val.length > 0) || "Please type something",
  (val: string) => (val && val.length >= 3) || "Minimum 3 characters",
  (val: string) => (val && val.length <= 300) || "Maximum 300 characters",
];

const onSubmit = () => {
  authorRef.value?.validate();
  const postsStore = usePostsStore();
  if (authorRef.value?.hasError || commentRef.value?.hasError) {
    $q.notify({
      color: "negative",
      message: "You need to fill all fields",
    });
  } else if (postStore?.post?.id) {
    postsStore.addComment(
      {
        comment: comment.value,
        author: author.value,
        date: new Date(),
      },
      postStore?.post?.id.toString()
    );
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Successfully added",
    });
    resetForm();
    prompt.value = false;
  }
};

const onCancel = () => {
  resetForm();
  prompt.value = false;
};

const resetForm = () => {
  author.value = "";
  authorRef.value?.resetValidation();
  comment.value = "";
  commentRef.value?.resetValidation();
};
</script>
