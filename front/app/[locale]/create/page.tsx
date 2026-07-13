"use client";

import { useState } from "react";
import { Send, Eye, Edit2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function CreatePostPage() {
  const t = useTranslations('CreatePost');
  const router = useRouter();
  const { isAuthenticated, accessToken, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Por favor, preencha o Título e o Conteúdo do post antes de publicar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/mensagens/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          titulo: title,
          conteudo: content,
        }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        alert("Erro ao criar o post. Verifique o console para mais detalhes.");
        console.error("Failed to create post", await res.text());
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Ocorreu um erro ao conectar com o servidor.");
      console.error("An error occurred", error);
      setIsSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div className="text-center py-20 text-slate-500">Verificando autenticação...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">{t('title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('postTitle')}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('postTitlePlaceholder')}
              required
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
            />
          </div>

          {/* Content (Markdown) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('content')}
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1.5 transition-colors"
              >
                {isPreview ? (
                  <>
                    <Edit2 className="w-4 h-4" />
                    {t('edit')}
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    {t('preview')}
                  </>
                )}
              </button>
            </div>
            
            {isPreview ? (
              <div className="w-full px-4 py-3 min-h-[300px] border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 rounded-lg prose prose-slate dark:prose-invert max-w-none">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-slate-400 italic">Nothing to preview</p>
                )}
              </div>
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder={t('contentPlaceholder')}
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow font-mono text-sm resize-y"
              ></textarea>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? t('publishing') : t('publishPost')}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}
