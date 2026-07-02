"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";
import { useTranslations } from "next-intl";

export interface Comentario {
  id: number;
  mensagem: number;
  autor: string;
  conteudo: string;
  criado_em: string;
}

interface CommentsSectionProps {
  postId: number;
  initialComments: Comentario[];
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const t = useTranslations('Post');
  const [comments, setComments] = useState<Comentario[]>(initialComments || []);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/comentarios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagem: postId,
          autor: name.trim() || "Anônimo",
          conteudo: comment,
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, newComment]);
        setName("");
        setComment("");
      } else {
        alert("Erro ao adicionar comentário.");
        console.error("Failed to add comment", await res.text());
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error("An error occurred", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
        {t('commentsHeader', { count: comments.length })}
      </h2>
      
      {comments.length > 0 && (
        <div className="space-y-6 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-full text-violet-600 dark:text-violet-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{c.autor}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(c.criado_em).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap pl-9">
                {c.conteudo}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
        <h3 className="font-bold mb-4 text-slate-900 dark:text-white">{t('addComment')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('yourName')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow text-sm"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('yourComment')}
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('commentPlaceholder')}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow text-sm resize-y"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "..." : t('postComment')}
          </button>
        </form>
      </div>
    </section>
  );
}
