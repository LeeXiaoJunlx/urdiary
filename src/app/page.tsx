"use client";

import { KeluhAdd } from "@/components/keluh-add";
import { KeluhCard } from "@/components/keluh-card";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { getPosts } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { KeluhPost } from "./types";
import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState<KeluhPost[]>([]);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isWibuMode, setIsWibuMode] = useState(false);

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
      <Navbar isWibuMode={isWibuMode} setIsWibuMode={setIsWibuMode} />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center space-x-2 justify-center mb-6">
          
        </div>
        <div className="flex flex-col items-center mb-12">
        {isWibuMode ? (
            <div className="z-10 mb-7 -mt-2">
              <Image src="/keluhkesah.png" alt="Keluh Kesah Logo" width={400} height={400} className="w-80 sm:w-96" unoptimized />
            </div>
          ) : (
            <div>
              <h1 className="relative z-10 text-4xl font-black text-center mb-4">
                Keluh Kesah
              </h1>
              <p className="relative z-10 text-muted-foreground text-center mb-6">
                Silahkan berkeluh kesah di sini.
              </p>
            </div>
          )}
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
