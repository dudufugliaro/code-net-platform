"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/routing";
import { LogOut, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AuthStatus() {
  const { isAuthenticated, logout } = useAuth();
  const t = useTranslations('Layout');

  if (isAuthenticated) {
    return (
      <button 
        onClick={logout}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
      >
        <LogOut className="w-4 h-4" />
        {t('logout') || "Sair"}
      </button>
    );
  }

  return (
    <Link 
      href="/login"
      className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
    >
      <LogIn className="w-4 h-4" />
      {t('login') || "Entrar"}
    </Link>
  );
}
