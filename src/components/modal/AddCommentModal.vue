<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 350px; background-color: #272b33">
      <q-card-section>
        <div class="text-h6 text-white">Add comment</div>
      </q-card-section>

      <div class="q-pa-md" style="max-width: 300px">
        <q-form
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
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, watch } from "vue";
import { useQuasar, QInput } from "quasar";
import { usePostsStore } from "@/stores/posts";

const $q = useQuasar();
const postStore = usePostsStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const showModal = ref(props.showModal);

const emit = defineEmits(["update:showModal", "handleFormSubmit"]);

watch(
  () => props.showModal,
  (newValue) => {
    showModal.value = newValue;
  }
);

const author = ref("");
const authorRef: Ref<QInput | null> = ref(null);
const comment = ref("");
const commentRef: Ref<QInput | null> = ref(null);
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
  if (authorRef.value?.hasError || commentRef.value?.hasError) {
    $q.notify({
      color: "negative",
      message: "You need to fill all fields",
    });
  } else if (postStore?.post?.id) {
    emit(
      "handleFormSubmit",
      {
        comment: comment.value,
        author: author.value,
        date: new Date(),
      },
      postStore?.post?.id
    );
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Successfully added",
    });
    resetForm();
    emit("update:showModal", false);
  }
};

const onCancel = () => {
  resetForm();
  emit("update:showModal", false);
};

const resetForm = () => {
  author.value = "";
  authorRef.value?.resetValidation();
  comment.value = "";
  commentRef.value?.resetValidation();
};
</script>
