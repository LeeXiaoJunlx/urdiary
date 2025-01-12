'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KeluhCard } from '@/components/keluh-card';
import { KeluhAdd } from '@/components/keluh-add';
import { getPosts } from '@/lib/storage';
import { MessageSquarePlus } from 'lucide-react';
import { KeluhPost } from './types';
import { ModeToggle } from '@/components/mode-toggle';
import { SkeletonCard } from '@/components/skeleton-card';
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';


export default function Home() {
  const [posts, setPosts] = useState<KeluhPost[]>([]);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    const posts = await getPosts();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-zinc-900">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] ",
        )}
        width={30}
        height={30}
        squares={[80, 80]}
        squaresClassName="hover:fill-main"
      />
      <nav className="relative z-10 border-b-4 border-border bg-bg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">
            Keluh Kesah
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="relative z-10 text-4xl font-black text-center mb-4">
            Keluh Kesah
          </h1>
          <p className="relative z-10 text-muted-foreground text-center mb-6">
            Silahkan berkeluh kesah di sini.
          </p>
          <Button
            className='relative z-10'
            size="lg"
            onClick={() => setIsNewPostOpen(true)}
          >
            <MessageSquarePlus className="w-5 h-5" />
            Tambah Keluhan
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {posts.map((post) => (
              <KeluhCard key={post.id} post={post} onUpdate={loadPosts} />
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center text-muted-foreground mt-8">
            Belum ada yang ngeluh nih. Yuk mulai ngeluh!
          </div>
        )}

        <KeluhAdd
          open={isNewPostOpen}
          onOpenChange={setIsNewPostOpen}
          onPostCreated={loadPosts}
        />
      </div>
    </main>
  );
}