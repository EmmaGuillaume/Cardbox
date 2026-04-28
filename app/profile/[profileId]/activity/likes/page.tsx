"use client";
import AuthGate from "@/components/features/AuthGate";

export default function ActivityLikesPage() {
  return (
    <AuthGate message="Connectez-vous pour voir vos films likés.">
      <div className="px-4 md:px-32 py-8 text-primary font-krub">
        <h1 className="font-merryweather text-2xl">J'aime</h1>
      </div>
    </AuthGate>
  );
}
