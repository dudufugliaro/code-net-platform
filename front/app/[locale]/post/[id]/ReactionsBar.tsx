"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/routing";

export interface ReacoesResumo {
  curtida: number;
  aplauso: number;
  amei: number;
  ideia: number;
}

interface ReactionsBarProps {
  postId: number;
  initialResumo: ReacoesResumo;
  initialMinhaReacao: string | null;
}

const REACOES = [
  { tipo: "curtida", emoji: "👍", labelKey: "reactionCurtida" },
  { tipo: "aplauso", emoji: "👏", labelKey: "reactionAplauso" },
  { tipo: "amei", emoji: "❤️", labelKey: "reactionAmei" },
  { tipo: "ideia", emoji: "💡", labelKey: "reactionIdeia" },
] as const;

export default function ReactionsBar({ postId, initialResumo, initialMinhaReacao }: ReactionsBarProps) {
  const t = useTranslations("Post");
  const { accessToken, isAuthenticated } = useAuth();
  const [resumo, setResumo] = useState<ReacoesResumo>(initialResumo || { curtida: 0, aplauso: 0, amei: 0, ideia: 0 });
  const [minhaReacao, setMinhaReacao] = useState<string | null>(initialMinhaReacao);
  const [isSending, setIsSending] = useState(false);

  const handleReagir = async (tipo: string) => {
    if (!isAuthenticated || isSending) return;
    setIsSending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/mensagens/${postId}/reagir/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tipo }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setResumo(data.reacoes_resumo);
        setMinhaReacao(data.minha_reacao);
      } else {
        console.error("Failed to react", await res.text());
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100 dark:border-slate-700">
      {REACOES.map(({ tipo, emoji, labelKey }) => {
        const count = resumo[tipo as keyof ReacoesResumo] || 0;
        const isActive = minhaReacao === tipo;

        return (
          <button
            key={tipo}
            type="button"
            onClick={() => handleReagir(tipo)}
            disabled={!isAuthenticated || isSending}
            title={!isAuthenticated ? t("loginToReact") : t(labelKey)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive
                ? "bg-violet-100 border-violet-300 text-violet-700 dark:bg-violet-900/40 dark:border-violet-600 dark:text-violet-300"
                : "bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <span>{emoji}</span>
            <span>{count > 0 ? count : ""}</span>
          </button>
        );
      })}

      {!isAuthenticated && (
        <Link
          href="/login"
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 ml-1"
        >
          {t("loginToReact")}
        </Link>
      )}
    </div>
  );
}