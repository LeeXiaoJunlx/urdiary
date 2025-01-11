"use server"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    include: { comments: true },
  });
}

export async function savePost(post) {
  const { comments, ...postData } = post;
  return await prisma.post.create({
    data: postData,
  });
}

export async function updatePost(updatedPost) {
  return await prisma.post.update({
    where: { id: updatedPost.id },
    data: updatedPost,
  });
}

export async function addComment(postId, comment) {
  return await prisma.comment.create({
    data: {
      ...comment,
      postId,
    },
  });
}

export async function toggleLove(postId) {
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