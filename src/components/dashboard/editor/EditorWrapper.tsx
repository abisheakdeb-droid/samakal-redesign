"use client";

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor').then(mod => mod.Editor), { 
  ssr: false,
  loading: () => <p className="p-8 text-gray-500">Editor loading...</p>
});

export default function EditorWrapper() {
  return <Editor />;
}
