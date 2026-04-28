"use client";
import AuthGate from "@/components/features/AuthGate";

export default function WatchlistPage() {
  return (
    <AuthGate message="Connectez-vous pour accéder à votre watchlist.">
      <div className="px-4 md:px-32 py-8 text-primary font-krub">
        <h1 className="font-merryweather text-2xl">Watchlist</h1>
        <p className="text-primary/60 text-sm mt-2">
          Les films que vous avez prévu de regarder.
        </p>
      </div>
    </AuthGate>
  );
}
