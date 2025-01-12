'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { savePost } from '@/lib/storage';
import { KeluhPost } from '@/app/types';
import { useToast } from '@/hooks/use-toast';

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

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPost: Omit<KeluhPost, 'comments'> = {
      id: crypto.randomUUID(),
      from: formData.from || 'Anonim',
      to: formData.to,
      message: formData.message,
      timestamp: new Date(),
      loveCount: 0,
    };

    await savePost(newPost);
    setFormData({ from: '', to: '', message: '' });
    setIsSubmitting(false);
    onOpenChange(false);
    onPostCreated();

    toast({
      title: 'Keluhan ditambahkan',
      description: 'Keluhanmu telah berhasil ditambahkan',
    });
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="loader border-t-transparent border-white border-2 border-t-2 rounded-full w-4 h-4 animate-spin"></span>
            ) : (
              'Tambah Keluhan'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}