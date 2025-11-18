'use client';

import { useRef } from 'react';

import { ListTodo } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500 p-2">
            <ListTodo size={30} color="white" />
          </div>
          <h1 className="text-4xl font-bold">CYL APP - Control your life</h1>
        </div>
      </div>

      <main className="flex max-h-96 w-8/12 flex-col gap-3 py-3" ref={containerRef}>
        <div>teste</div>
      </main>
    </div>
  );
}
