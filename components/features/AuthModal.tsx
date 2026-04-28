"use client";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext";
import { useSignIn, useSignUp } from "@/hooks/use-auth";

export default function AuthModal() {
  const { open, mode, setMode, closeModal } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const signIn = useSignIn();
  const signUp = useSignUp();

  const isLoading = signIn.isPending || signUp.isPending;

  // Reset à chaque ouverture / changement de mode
  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setUsername("");
      setErrorMsg(null);
    }
  }, [open, mode]);

  // ESC pour fermer + lock du scroll body
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeModal]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      if (mode === "signin") {
        await signIn.mutateAsync({ email, password });
      } else {
        if (!username.trim()) {
          setErrorMsg("Choisissez un nom d'utilisateur.");
          return;
        }
        await signUp.mutateAsync({ email, password, username });
      }
      closeModal();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-krub"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-background-900 border border-background-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Fermer"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-primary/60 hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-7 pt-8 pb-2 flex flex-col items-center gap-3">
          <svg width="65" height="23" viewBox="0 0 65 23" aria-hidden="true">
            <ellipse cx="12.1078" cy="11.5" rx="12.1078" ry="11.5" fill="#FF7285" />
            <ellipse cx="32.4999" cy="11.5" rx="12.1078" ry="11.5" fill="#F6FF72" />
            <ellipse cx="52.892" cy="11.5" rx="12.1078" ry="11.5" fill="#72BDFF" />
          </svg>
          <h2
            id="auth-modal-title"
            className="text-primary font-merryweather text-2xl"
          >
            {mode === "signin" ? (
              <>
                Bon <span className="text-yellow">retour</span> !
              </>
            ) : (
              <>
                Rejoindre <span className="text-red">Cardbooxd</span>
              </>
            )}
          </h2>
          <p className="text-primary/60 text-sm text-center">
            {mode === "signin"
              ? "Connectez-vous pour retrouver votre bibliothèque."
              : "Créez votre compte pour commencer à noter vos films."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-username"
                className="text-xs uppercase tracking-wide text-primary/50"
              >
                Nom d'utilisateur
              </label>
              <input
                id="auth-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Clémeninou"
                className="bg-background-800 border border-transparent focus:border-background-600 rounded-md px-3 py-2 text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-email"
              className="text-xs uppercase tracking-wide text-primary/50"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="bg-background-800 border border-transparent focus:border-background-600 rounded-md px-3 py-2 text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-password"
              className="text-xs uppercase tracking-wide text-primary/50"
            >
              Mot de passe
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-background-800 border border-transparent focus:border-background-600 rounded-md px-3 py-2 text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <div className="text-red text-sm bg-red/10 border border-red/30 rounded-md px-3 py-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex items-center justify-center gap-2 bg-primary text-background font-bold rounded-md py-2.5 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "signin" ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        {/* Footer toggle */}
        <div className="px-7 pb-7 pt-2 text-center text-sm text-primary/60 border-t border-background-800">
          <span className="block pt-4">
            {mode === "signin" ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-blue hover:underline cursor-pointer"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-blue hover:underline cursor-pointer"
                >
                  Se connecter
                </button>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
