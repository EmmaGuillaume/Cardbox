"use client";
import { ClockFading, Settings, UserStar } from 'lucide-react';
import Link from 'next/link';
import { useDrawer } from '../context/DrawerContext';
import FriendsList from '../features/FriendsList';
import { useState } from 'react';

const TABS = [
  { id: 'watchlist', icon: ClockFading, Page: null },
  { id: 'following', icon: UserStar,    Page: FriendsList },
] as const;

export default function UserDrawerMobile() {
  const { open } = useDrawer();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'following'>('following');

  if (!open) return null;

  const ActivePage = TABS.find(t => t.id === activeTab)?.Page;

  return (
    <div className="fixed top-16 bottom-16 left-0 right-0 z-40 flex flex-col bg-[#0e0e1c] lg:hidden">

      {/* En-tête profil */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/80" alt="Avatar"
            className="w-16 h-16 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-primary font-bold text-2xl leading-tight font-serif">Clémeninou</span>
            <span className="text-primary/50 text-sm">1 abonné · 1 suivi</span>
          </div>
        </div>
        <Link href="/settings"
          className="flex items-center gap-1.5 text-white/70 text-sm border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors">
          <Settings size={14} /> Paramètres
        </Link>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-white/10">
        {TABS.map(({ id, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex justify-center items-center py-3 transition-colors cursor-pointer
              ${activeTab === id
                ? 'text-primary/90 border-b-2 border-primary/50'
                : 'text-primary hover:text-white/70'}`}>
            <Icon size={20} />
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto">
        {ActivePage ? <ActivePage /> : (
          <div className="flex items-center justify-center h-40 text-white/30 text-sm">
            Bientôt disponible
          </div>
        )}
      </div>

    </div>
  );
}