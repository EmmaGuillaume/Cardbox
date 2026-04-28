"use client";
import AuthGate from "@/components/features/AuthGate";
import { useAuth, useSignOut } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";

function SettingsContent() {
  const { user, profile } = useAuth();
  const signOut = useSignOut();

  return (
    <div className="px-4 md:px-32 py-8 text-primary font-krub flex flex-col gap-6 max-w-2xl">
      <h1 className="font-merryweather text-2xl">Paramètres</h1>

      <section className="bg-background-900 border border-background-800 rounded-md p-5 flex flex-col gap-3">
        <h2 className="text-primary/70 text-sm uppercase tracking-wide">
          Compte
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-primary/60 text-sm">Nom d'utilisateur</span>
          <span>{profile?.username ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary/60 text-sm">Email</span>
          <span>{user?.email ?? "—"}</span>
        </div>
      </section>

      <button
        onClick={() => signOut.mutate()}
        disabled={signOut.isPending}
        className="self-start flex items-center gap-2 bg-red/10 hover:bg-red/20 text-red border border-red/30 rounded-md px-4 py-2 transition-colors cursor-pointer disabled:opacity-60"
      >
        <LogOut className="w-4 h-4" />
        Se déconnecter
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuthGate message="Connectez-vous pour accéder à vos paramètres.">
      <SettingsContent />
    </AuthGate>
  );
}
