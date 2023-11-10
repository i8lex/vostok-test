import { defineStore } from "pinia";
import { URL } from "@/constants";
interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
}
export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
    post: null,
  }),

  actions: {
    async loadPosts() {
      const response = await fetch(`${URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        this.posts = data;
      }
    },
    async loadPost(id: number) {
      const response = await fetch(`${URL}/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        this.post = data;
      }
    },

    async addPost(newPost: Post) {
      const response = await fetch(`${URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        const data = await response.json();
        this.posts.push(data);
      }
    },

    async deletePost(postId: number) {
      const response = await fetch(`${URL}/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.posts = this.posts.filter((post) => post.id !== postId);
      }
    },
  },
});
