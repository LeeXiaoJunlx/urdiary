"use client";

import { KeluhAdd } from "@/components/keluh-add";
import { KeluhCard } from "@/components/keluh-card";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getPosts } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { KeluhPost } from "./types";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  const [posts, setPosts] = useState<KeluhPost[]>([]);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  const loadPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-zinc-900">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] "
        )}
        width={30}
        height={30}
        squares={[80, 80]}
        squaresClassName="hover:fill-main"
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center space-x-2 justify-center mb-6">
          <Switch id="wibu-mode" className="z-10" />
          <Label htmlFor="wibu-mode" className="z-10">
            Wibu Mode
          </Label>
        </div>
        <div className="flex flex-col items-center mb-12">
          <h1 className="relative z-10 text-4xl font-black text-center mb-4">
            Keluh Kesah
          </h1>
          <p className="relative z-10 text-muted-foreground text-center mb-6">
            Silahkan berkeluh kesah di sini.
          </p>
          <Button
            className="relative z-10"
            size="lg"
            onClick={() => setIsNewPostOpen(true)}
          >
            <MessageSquarePlus className="w-5 h-5" />
            Tambah Keluhan
          </Button>
        </div>

        
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {posts.map((post) => (
              <KeluhCard key={post.id} post={post} onUpdate={loadPosts} />
            ))}
          </div>
        

        

        <KeluhAdd
          open={isNewPostOpen}
          onOpenChange={setIsNewPostOpen}
          onPostCreated={loadPosts}
        />
      </div>
    </main>
  );
}
