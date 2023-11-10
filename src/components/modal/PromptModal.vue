<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Add post" color="primary" @click="prompt = true" />

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px; background-color: #272b33">
        <q-card-section>
          <div class="text-h6 text-white">Add post</div>
        </q-card-section>

        <div class="q-pa-md" style="max-width: 300px">
          <form
            @submit.prevent.stop="onSubmit"
            @cancel.prevent.stop="onCancel"
            class="q-gutter-md"
          >
            <q-input
              dark
              ref="titleRef"
              filled
              v-model="title"
              label="Title"
              hint="Enter title"
              lazy-rules
              :rules="authorRules"
            />
            <q-input
              dark
              ref="descriptionRef"
              filled
              type="textarea"
              v-model="description"
              label="Description"
              hint="Enter description"
              lazy-rules
              :rules="descriptionRules"
            />
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

            <div>
              <q-btn label="Add post" type="submit" color="primary" />
              <q-btn
                label="Cancel"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm text-white"
                v-close-popup
              />
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar, Notify } from "quasar";
import { ref } from "vue";
import { usePostsStore } from "@/stores/posts";

export default {
  setup() {
    const $q = useQuasar();
    Notify.setDefaults({
      position: "top-right",
      timeout: 2500,
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
    });

    const author = ref(null);
    const authorRef = ref(null);
    const description = ref(null);
    const descriptionRef = ref(null);
    const title = ref(null);
    const titleRef = ref(null);
    return {
      prompt: ref(false),
      author,
      authorRef,
      authorRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && val.length >= 3) || "Minimum 3 characters",
        (val) => (val && val.length <= 30) || "Maximum 30 characters",
      ],
      description,
      descriptionRef,
      descriptionRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && val.length >= 3) || "Minimum 3 characters",
        (val) => (val && val.length <= 300) || "Maximum 300 characters",
      ],
      title,
      titleRef,
      titleRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && val.length >= 3) || "Minimum 3 characters",
        (val) => (val && val.length <= 30) || "Maximum 30 characters",
      ],

      onSubmit() {
        authorRef.value.validate();
        const postsStore = usePostsStore();
        if (
          authorRef.value.hasError ||
          descriptionRef.value.hasError ||
          titleRef.value.hasError
        ) {
          $q.notify({
            color: "negative",
            message: "You need to fill all fields",
          });
        } else {
          postsStore.addPost({
            title: title.value,
            description: description.value,
            author: author.value,
          });
          $q.notify({
            icon: "done",
            color: "positive",
            message: "Successfully added",
          });
          this.resetForm();
          this.prompt = false;
        }
      },

      onCancel() {
        this.resetForm();
      },

      resetForm() {
        author.value = null;
        authorRef.value.resetValidation();
        description.value = null;
        descriptionRef.value.resetValidation();
        title.value = null;
        titleRef.value.resetValidation();
      },
    };
  },
};
</script>
