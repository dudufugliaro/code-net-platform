import Link from "next/link";
import { ArrowLeft, User, Calendar, Send } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Static content matching the mockup
  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to posts
        </Link>
      </div>

      <article className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Getting Started with React Hooks</h1>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Sarah Johnson</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>May 10, 2026</span>
            </div>
          </div>
        </header>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Getting Started with React Hooks</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            React Hooks revolutionized the way we write React components. Let's dive into the basics!
          </p>

          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">What are Hooks?</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Hooks are functions that let you "hook into" React state and lifecycle features from function components.
          </p>

          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">useState Hook</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            The most basic hook is <code className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono">useState</code>:
          </p>

          <pre className="bg-[#1e293b] text-slate-50 p-4 rounded-lg overflow-x-auto mb-6 text-sm font-mono">
<code>{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}</code>
          </pre>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-8">
            Happy coding! 🚀
          </p>
        </div>
      </article>

      <section className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Comments (2)</h2>
        
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex flex-col mb-2">
                <span className="font-semibold text-slate-900 dark:text-white text-sm">Mike Chen</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">May 10, 2026</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Great introduction! I've been using hooks for a year now and they've completely changed how I write React.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex flex-col mb-2">
                <span className="font-semibold text-slate-900 dark:text-white text-sm">Emily Rodriguez</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">May 11, 2026</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Could you do a follow-up on <code className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-1 py-0.5 rounded text-xs font-mono">useCallback</code> and <code className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-1 py-0.5 rounded text-xs font-mono">useMemo</code>? Those are still a bit confusing to me.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Add a comment</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm resize-y"
              ></textarea>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
