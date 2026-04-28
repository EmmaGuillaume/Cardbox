"use client";
import {
  Activity,
  ClockFading,
  Heart,
  List,
  LogOut,
  MessageSquare,
  Settings,
  TextAlignStart,
  UserStar,
} from "lucide-react";
import Link from "next/link";
import { useDrawer } from "../context/DrawerContext";
import { useAuth, useSignOut } from "@/hooks/use-auth";

export default function UserDrawerDesktop() {
  const { open } = useDrawer();
  const { user, profile, isAuthenticated } = useAuth();
  const signOut = useSignOut();

  // Le bouton qui ouvre ce drawer n'apparaît que si l'utilisateur est connecté,
  // mais on garde quand même le garde-fou ici.
  if (!isAuthenticated) return null;

  const userId = user?.id ?? "1";
  const username = profile?.username ?? "Utilisateur";
  const avatarUrl = profile?.avatar_url || "https://i.pravatar.cc/80";

  return (
    <nav
      className={`hidden lg:flex scrollbar-custom bg-background-900 flex flex-col pt-6 pb-3 gap-4 overflow-y-auto overflow-x-hidden
        transition-all duration-300 ease-in-out my-4 rounded-l-2xl
        ${open ? "w-80 opacity-100 px-5" : "w-0 opacity-0 px-0"}
      `}
    >
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-25 h-25 rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt="Profil utilisateur"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white text-3xl font-bold font-serif">
          {username}
        </span>
        <span className="text-primary-100 text-md">0 abonné · 0 suivi</span>
      </div>

      {/* Favorite films */}
      <div className="flex justify-center">
        <div className="inline-flex flex-col gap-2">
          <span className="text-gray-400 text-sm">Films préférés</span>
          <ul className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <li
                key={i}
                className="w-14 h-20 o flex-shrink-0 cursor-pointer border border-transparent hover:border-background-600 rounded-lg"
              >
                <img
                  src="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
                  alt="Titre du film"
                  className="w-full h-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nav links */}
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            href={`/profile/${userId}/friends`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <UserStar className="w-5 h-5 text-gray-400" />
            <span>Amis</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/profile/${userId}/list`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <List className="w-5 h-5 text-gray-400" />
            <span>Listes</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/profile/${userId}/watchlist`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ClockFading className="w-5 h-5 text-gray-400" />
            <span>Watchlist</span>
          </Link>
        </li>

        {/* Activity with sub-items */}
        <li>
          <Link
            href={`/profile/${userId}/activity`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Activity className="w-5 h-5 text-gray-400" />
            <span>Activité</span>
          </Link>
          <ul className="flex flex-col gap-1 mt-1 ml-5 border-l border-white/10 pl-3">
            <li>
              <Link
                href={`/profile/${userId}/activity`}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <TextAlignStart className="w-5 h-5 text-gray-400" />
                <span>Tout</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/profile/${userId}/activity/reviews`}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span>Avis</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/profile/${userId}/activity/likes`}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-400" />
                <span>J'aime</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Divider + Settings + Sign out */}
      <div className="mt-auto flex flex-col gap-2">
        <hr className="border-white/10" />
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-400" />
          <span>Paramètres</span>
        </Link>
        <button
          onClick={() => signOut.mutate()}
          disabled={signOut.isPending}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red/80 hover:bg-red/10 hover:text-red transition-colors cursor-pointer disabled:opacity-60"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
