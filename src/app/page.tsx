'use client';

import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-center mb-4">
            Keluh Kesah
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Silahkan berkeluh kesah di sini sepuasnya.
          </p>
          <Button
            size="lg"
          >
            <MessageSquarePlus className="w-5 h-5" />
            Keluhan Baru
          </Button>
        </div>
      </div>
    </main>
  );
}