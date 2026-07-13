import { Link } from "@/i18n/routing";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CommentsSection, { Comentario } from "./CommentsSection";
import ReactionsBar, { ReacoesResumo } from "./ReactionsBar";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export interface Mensagem {
  id: number;
  titulo: string;
  conteudo: string;
  autor: { username: string } | null;
  criada_em: string;
  comentarios: Comentario[];
  reacoes_resumo: ReacoesResumo;
  minha_reacao: string | null;
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
              <span>{post.autor?.username || "Anônimo"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{dateStr}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
          <MarkdownRenderer content={post.conteudo} />
        </div>

        <ReactionsBar
          postId={post.id}
          initialResumo={post.reacoes_resumo}
          initialMinhaReacao={post.minha_reacao}
        />
      </article>

      {/* Interactive Comments Section */}
      <CommentsSection postId={post.id} initialComments={post.comentarios} />
    </div>
  );
}