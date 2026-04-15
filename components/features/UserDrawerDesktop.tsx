"use client";
import { Activity, ClockFading, Heart, List, MessageSquare, Settings, TextAlignStart, UserStar } from 'lucide-react';
import Link from 'next/link'
import { useDrawer } from '../context/DrawerContext';

export default function UserDrawerDesktop() {
    const { open } = useDrawer();
  return (
<nav className={`h-full bg-background-900 flex flex-col pt-6 pb-3 gap-4 overflow-y-auto overflow-x-hidden
  transition-all duration-300 ease-in-out
  ${open ? "w-80 opacity-100 px-5" : "w-0 opacity-0 px-0"}
`}>
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-25 h-25 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/80"
            alt="Profil utilisateur"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white text-3xl font-bold font-serif">Clémeninou</span>
        <span className="text-primary-100 text-md">1 abonné · 1 suivi</span>
      </div>

      {/* Favorite films */}
      <div className="flex justify-center">
        <div className="inline-flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Films préférés</span>
            <ul className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
                <li key={i} className="w-14 h-20 o flex-shrink-0 cursor-pointer border border-transparent hover:border-background-600 rounded-lg">
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
          <Link href="/profile/1/friends" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <UserStar className="w-5 h-5 text-gray-400" />
            <span>Amis</span>
          </Link>
        </li>
        <li>
          <Link href="/profile/1/list" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <List className="w-5 h-5 text-gray-400" />
            <span>Listes</span>
          </Link>
        </li>
        <li>
          <Link href="/profile/1/watchlist" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <ClockFading className="w-5 h-5 text-gray-400" />
            <span>Watchlist</span>
          </Link>
        </li>

        {/* Activity with sub-items */}
        <li>
          <Link href="/profile/1/activity" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <Activity className="w-5 h-5 text-gray-400" />
            <span>Activité</span>
          </Link>
          <ul className="flex flex-col gap-1 mt-1 ml-5 border-l border-white/10 pl-3">
            <li>
              <Link href="/profile/1/activity/all" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <TextAlignStart className="w-5 h-5 text-gray-400" />
                <span>Tout</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/1/activity/reviews" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span>Avis</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/1/activity/likes" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Heart className="w-5 h-5 text-gray-400" />
                <span>J'aime</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Divider + Settings */}
      <div className="mt-auto flex flex-col gap-2">
        <hr className="border-white/10" />
        <Link href="/setting" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
          <span>Paramètres</span>
        </Link>
      </div>
    </nav>
  )
}