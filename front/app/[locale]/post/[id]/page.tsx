import { Link } from "@/i18n/routing";
import { ArrowLeft, User, Calendar, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface Mensagem {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  criada_em: string;
}

async function getPost(id: string): Promise<Mensagem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/mensagens/${id}/`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string, locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Post' });
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const dateStr = new Date(post.criada_em).toLocaleDateString();
  
  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('backToPosts')}
        </Link>
      </div>

      <article className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{post.titulo}</h1>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.autor || "Anônimo"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{dateStr}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed whitespace-pre-wrap">
            {post.conteudo}
          </p>
        </div>
      </article>

      {/* Mock Comments Section */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('commentsHeader', { count: 0 })}</h2>
        
        <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
          <h3 className="font-bold mb-4 text-slate-900 dark:text-white">{t('addComment')}</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('yourName')}
              </label>
              <input
                type="text"
                id="name"
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
                placeholder={t('commentPlaceholder')}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow text-sm resize-y"
              ></textarea>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              <Send className="w-4 h-4" />
              {t('postComment')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
