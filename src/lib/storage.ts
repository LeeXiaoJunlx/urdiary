import { MenfessPost, Comment } from '@/app/types';

const STORAGE_KEY = 'menfess-posts';

export function getPosts(): MenfessPost[] {
  if (typeof window === 'undefined') return [];
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
}

export function savePost(post: MenfessPost) {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function updatePost(updatedPost: MenfessPost) {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
}

export function addComment(postId: string, comment: Comment) {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.comments.push(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
}

export function toggleLove(postId: string) {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.loveCount += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return post.loveCount;
  }
  return 0;
}