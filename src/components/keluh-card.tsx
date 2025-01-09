'use client';

import { useState } from 'react';
import { KeluhPost } from '@/app/types';
import { Heart, MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';
import { toggleLove, addComment } from '@/lib/storage';
import { Input } from './ui/input';

interface KeluhCardProps {
  post: KeluhPost;
  onUpdate: () => void;
}

export function KeluhCard({ post, onUpdate }: KeluhCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [commentFrom, setCommentFrom] = useState('');

  const handleLove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLove(post.id);
    onUpdate();
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment(post.id, {
      id: crypto.randomUUID(),
      from: commentFrom || 'Anonim',
      text: comment,
      timestamp: new Date().toISOString(),
    });
    setComment('');
    onUpdate();
  };

  const date = new Date(post.timestamp);
  const formattedDateTime = date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Card
        className="h-[160px] p-5 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">
              Dari: {post.from}
            </p>
            <p className="text-xs font-medium text-primary">
              Untuk: {post.to}
            </p>
          </div>
          <div className="text-xs text-gray-400">
            <div className="flex items-center gap-1 justify-end">
              <Calendar className="w-3 h-3" />
              <span>{formattedDateTime}</span>
            </div>
          </div>
        </div>

        <div className="h-[40px] overflow-hidden">
          <p className="text-sm line-clamp-2">
            {post.message}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleLove}
          >
            <Heart
              className={cn('w-4 h-4', {
                'fill-red-500 text-red-500': post.loveCount > 0,
              })}
            />
            <span className="text-sm">{post.loveCount}</span>
          </Button>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.comments.length}</span>
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[70vh] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Untuk: {post.to}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Dari: {post.from}</p>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedDateTime}</span>
              </div>
            </div>

            <p className="text-sm whitespace-pre-wrap">{post.message}</p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleLove}
              >
                <Heart
                  className={cn('w-5 h-5', {
                    'fill-red-500 text-red-500': post.loveCount > 0,
                  })}
                />
                <span>{post.loveCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments.length} Komentar</span>
              </Button>
            </div>

            {showComments && (
              <div className="space-y-4">
                <form onSubmit={handleComment} className="flex gap-2">
                  <Input
                    placeholder="Dari (Opsional)"
                    value={commentFrom}
                    onChange={(e) => setCommentFrom(e.target.value)}
                    className="w-1/3"
                  />
                  <Input
                    placeholder="Tambahkan komentar..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    Kirim
                  </Button>
                </form>

                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="text-sm space-y-1">
                      <p className="font-medium">{comment.from}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}