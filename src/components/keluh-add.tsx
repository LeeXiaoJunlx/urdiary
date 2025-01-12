'use client';

import { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { savePost } from '@/lib/storage';
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
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await savePost({
        from: fromRef.current?.value || 'Anonim',
        to: toRef.current?.value || '',
        message: messageRef.current?.value || '',
      });

      if (fromRef.current) fromRef.current.value = '';
      if (toRef.current) toRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';

      onOpenChange(false);
      onPostCreated();
      setCooldown(5);

      toast({
        description: 'Keluhanmu telah berhasil ditambahkan',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          description: 'Terjadi masalah, coba lagi.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
              ref={fromRef}
            />
          </div>
          <div>
            <Input
              placeholder="Untuk"
              ref={toRef}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Keluhanmu"
              ref={messageRef}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || cooldown > 0}>
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