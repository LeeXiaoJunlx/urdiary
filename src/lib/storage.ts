"use server"

import { PrismaClient, Post, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    include: { comments: true },
    orderBy: { timestamp: 'desc' },
  });
}

export async function savePost(post: Post) {
  const existingPost = await prisma.post.findFirst({
    where: {
      message: post.message,
      from: post.from, 
    },
  });

  if (existingPost) {
    throw new Error('Dilarang spam ya kids');
  }

  const { ...postData } = post;
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

export async function addComment(postId: string, comment: Comment) {
  const existingComment = await prisma.comment.findFirst({
    where: {
      text: comment.text,
      from: comment.from, 
      postId: postId,
    },
  });

  if (existingComment) {
    throw new Error('Sekali aja ya, jangan spam.');
  }

  return await prisma.comment.create({
    data: {
      ...comment,
      postId,
    },
  });
}

export async function toggleLove(postId: string) {
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