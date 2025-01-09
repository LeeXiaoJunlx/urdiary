'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { savePost } from '@/lib/storage';
import { KeluhPost } from '@/app/types';

interface KeluhAddProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated: () => void;
}

export function KeluhAdd({
  open,
  onOpenChange,
  onPostCreated,
}: KeluhAddProps) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: KeluhPost = {
      id: crypto.randomUUID(),
      from: formData.from || 'Anonim',
      to: formData.to,
      message: formData.message,
      timestamp: new Date().toISOString(),
      loveCount: 0,
      comments: [],
    };

    savePost(newPost);
    setFormData({ from: 'Anonim', to: '', message: '' });
    onOpenChange(false);
    onPostCreated();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mulai mengeluh</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Dari (opsional)"
              value={formData.from}
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Untuk"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Keluhanmu"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Tambah Keluhan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}