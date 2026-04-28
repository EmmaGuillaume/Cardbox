"use client";
import { Loader2, Lock } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthModal } from "../context/AuthModalContext";

type Props = {
  children: React.ReactNode;
  /**
   * Message à afficher derrière la modale en cas de non-connexion.
   * Exemple : "Connectez-vous pour voir vos amis."
   */
  message?: string;
};

/**
 * Garde côté client : si l'utilisateur n'est pas connecté, on ouvre la modale
 * d'authentification et on bloque l'affichage des enfants.
 *
 * À utiliser sur les pages "privées" : /list, /watchlist, /friends, /settings, etc.
 */
export default function AuthGate({
  children,
  message = "Vous devez être connecté pour accéder à cette page.",
}: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const { openModal, open } = useAuthModal();

  // Dès qu'on sait que l'utilisateur n'est pas authentifié, on ouvre la modale
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !open) {
      openModal("signin");
    }
    // On veut que ça réagisse uniquement aux changements d'état d'auth.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-primary/50">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-background-800 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary/60" />
          </div>
          <p className="text-primary/70">{message}</p>
          <button
            onClick={() => openModal("signin")}
            className="bg-primary text-background font-bold rounded-md px-5 py-2 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
