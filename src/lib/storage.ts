"use server"

import { PrismaClient, Post, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    include: { comments: true },
    orderBy: { timestamp: 'desc' },
  });
}

export async function savePost(post: any) {
  const { comments, ...postData } = post;
  return await prisma.post.create({
    data: postData,
  });
}

export async function updatePost(updatedPost: Post) {
  return await prisma.post.update({
    where: { id: updatedPost.id },
    data: updatedPost,
  });
}

export async function addComment(postId: any, comment: Comment) {
  return await prisma.comment.create({
    data: {
      ...comment,
      postId,
    },
  });
}

export async function toggleLove(postId: any) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (post) {
    return await prisma.post.update({
      where: { id: postId },
      data: { loveCount: post.loveCount + 1 },
    });
  }
}