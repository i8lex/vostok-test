export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  postId: string;
  author: string;
  comment: string;
  date: Date;
}
