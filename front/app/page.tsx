import Link from "next/link";
import { User, Calendar, MessageSquare } from "lucide-react";

const POSTS = [
  {
    id: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    author: "Sarah Johnson",
    date: "May 10, 2026",
    comments: 2,
    excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic. We'll explore useState, useEffect, and custom hooks.",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices in 2026",
    author: "David Kim",
    date: "May 8, 2026",
    comments: 1,
    excerpt: "Discover modern TypeScript patterns and best practices that will make your code more maintainable and type-safe.",
  },
  {
    id: "building-scalable-apis",
    title: "Building Scalable APIs with Node.js",
    author: "Alex Thompson",
    date: "May 5, 2026",
    comments: 0,
    excerpt: "A comprehensive guide to designing and building scalable REST APIs using Node.js and Express.",
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Posts</h1>
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{POSTS.length} posts</span>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id} className="block group">
            <article className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:border-slate-600 transition-shadow">
              <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments} comments</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
