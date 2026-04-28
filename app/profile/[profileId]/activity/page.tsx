"use client";
import AuthGate from "@/components/features/AuthGate";

export default function ActivityPage() {
  return (
    <AuthGate message="Connectez-vous pour voir votre activité.">
      <div className="h-full px-4 md:px-32 py-8 text-primary font-krub">
        <h1 className="font-merryweather text-2xl">Activité</h1>
      </div>
    </AuthGate>
  );
}
