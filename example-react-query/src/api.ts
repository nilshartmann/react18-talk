import { BlogPost, Comment } from "./types";

import comments from "./mock/comments.json";
import posts from "./mock/posts.json";

export function getPosts(): Promise<BlogPost[]> {
  return sendAfter(posts, "getPosts");
}

export function getPost(postId: string): Promise<BlogPost | null> {
  return sendAfter(
    posts.find((p) => p.id === postId) || null,
    `getPost(${postId})`
  );
}

export function getComments(postId: string): Promise<Comment[]> {
  return sendAfter(
    comments.filter((c) => c.postId === postId),
    `getComments(${postId})`,
    1800
  );
}

function sendAfter<O>(obj: O, msg: string, timeout: number = 1200): Promise<O> {
  return new Promise((res) => {
    console.log("Start ", msg);
    setTimeout(() => {
      console.log("Finish ", msg);
      res(obj);
    }, timeout);
  });
}
