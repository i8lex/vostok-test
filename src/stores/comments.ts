import { defineStore } from "pinia";

interface Comment {
  id: number;
  postId: number;
  body: string;
}
export const useCommentsStore = defineStore("comments", {
  state: () => ({
    comments: [],
  }),

  actions: {
    async loadComments(postId: number) {
      // Отримати коментарі для вказаного поста та оновити this.comments
    },

    async addComment(newComment: Comment) {
      // Додати новий коментар та оновити this.comments
    },
  },
});
