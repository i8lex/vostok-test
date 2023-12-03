<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px; background-color: #272b33">
        <q-card-section>
          <div class="text-h6 text-white">Add post</div>
        </q-card-section>

        <div class="q-pa-md" style="max-width: 300px">
          <q-form
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
              :rules="titleRules"
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
  </div>
</template>

<script setup lang="ts">
import { useQuasar, QInput } from "quasar";
import { defineProps, ref, Ref, watch, defineEmits } from "vue";

const props = defineProps({
  prompt: {
    type: Boolean,
  },
});

const showDialog = ref(props.prompt);

const emit = defineEmits(["update:prompt", "submit"]);

watch(
  () => props.prompt,
  (newValue) => {
    showDialog.value = newValue;
  }
);

const $q = useQuasar();
const author = ref("");
const authorRef: Ref<QInput | null> = ref(null);
const description = ref("");
const descriptionRef: Ref<QInput | null> = ref(null);
const title = ref("");
const titleRef: Ref<QInput | null> = ref(null);

const authorRules = [
  (val: string) => (val && val.length > 0) || "Please type something",
  (val: string) => (val && val.length >= 3) || "Minimum 3 characters",
  (val: string) => (val && val.length <= 30) || "Maximum 30 characters",
];
const descriptionRules = [
  (val: string) => (val && val.length > 0) || "Please type something",
  (val: string) => (val && val.length >= 3) || "Minimum 3 characters",
  (val: string) => (val && val.length <= 300) || "Maximum 300 characters",
];
const titleRules = [
  (val: string) => (val && val.length > 0) || "Please type something",
  (val: string) => (val && val.length >= 3) || "Minimum 3 characters",
  (val: string) => (val && val.length <= 30) || "Maximum 30 characters",
];

const onSubmit = () => {
  if (
    authorRef.value?.hasError ||
    descriptionRef.value?.hasError ||
    titleRef.value?.hasError
  ) {
    $q.notify({
      color: "negative",
      message: "You need to fill all fields",
    });
  } else {
    emit("submit", {
      title: title.value,
      description: description.value,
      author: author.value,
    });
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Successfully added",
    });
    resetForm();
    emit("update:prompt", false);
  }
};

const onCancel = () => {
  resetForm();
  emit("update:prompt", false);
};

const resetForm = () => {
  author.value = "";
  authorRef.value?.resetValidation();
  description.value = "";
  descriptionRef.value?.resetValidation();
  title.value = "";
  titleRef.value?.resetValidation();
};
</script>
