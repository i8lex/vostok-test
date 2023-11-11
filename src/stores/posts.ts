import { defineStore } from "pinia";
import { URL } from "@/constants";

export interface Post {
  id?: number;
  title: string;
  description: string;
  author: string;
  comments?: Comment[];
}

interface Comment {
  postId?: string;
  author: string;
  comment: string;
  date: Date;
}
export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
    post: {} as Post,
  }),

  actions: {
    async loadPosts() {
      const response = await fetch(`${URL}/posts`);
      if (response.ok) {
        this.posts = await response.json();
      }
    },
    async loadPost(id: number) {
      const response = await fetch(`${URL}/posts/${id}?_embed=comments`);
      if (response.ok) {
        this.post = await response.json();
        const res = await fetch(`${URL}/posts/${id}/comments`);
        if (res.ok) {
          this.post.comments = await res.json();
        }
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
    async addComment(newComment: Comment, postId: string) {
      const response = await fetch(`${URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (response.ok) {
        const data = await response.json();
        this.post.comments?.push(data);
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
