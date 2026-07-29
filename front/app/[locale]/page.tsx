import { Link } from "@/i18n/routing";
import { User, Calendar, MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Mensagem {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  criada_em: string;
}

async function getPosts(): Promise<Mensagem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/mensagens/`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const t = await getTranslations('Home');
  const POSTS = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('latestPosts')}</h1>
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('postsCount', { count: POSTS.length })}</span>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => {
          const dateStr = new Date(post.criada_em).toLocaleDateString();
          return (
            <Link href={`/post/${post.id}`} key={post.id} className="block group">
              <article className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-violet-200 dark:hover:border-violet-900/50 transition-all duration-300 group-hover:-translate-y-1">
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {post.titulo}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{post.autor || "Anônimo"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('comments', { count: 0 })}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {post.conteudo.length > 150 ? post.conteudo.substring(0, 150) + "..." : post.conteudo}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
