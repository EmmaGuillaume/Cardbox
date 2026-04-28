"use client";
import AuthGate from "@/components/features/AuthGate";

export default function FriendsPage() {
  return (
    <AuthGate message="Connectez-vous pour voir vos amis.">
      <div className="h-full px-4 md:px-32 py-8 text-primary font-krub">
        <h1 className="font-merryweather text-2xl">Amis</h1>
        <p className="text-primary/60 text-sm mt-2">
          Retrouvez ici les personnes que vous suivez.
        </p>
      </div>
    </AuthGate>
  );
}
