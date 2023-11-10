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
    async loadComments(postId: number) {},

    async addComment(newComment: Comment) {},
  },
});
