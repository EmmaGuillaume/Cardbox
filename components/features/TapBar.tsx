"use client";
import Link from 'next/link'
import { House, Search, Library, Activity} from "lucide-react";
import { useDrawer } from "../context/DrawerContext";

export default function TapBar() {
    const { setOpen } = useDrawer();
    return (
        <div className="w-full h-16 px-4 bg-background-900/80 flex justify-around items-center fixed bottom-0 border-t border-background-800 backdrop-blur-lg text-primary font-krub text-xs lg:hidden">
            <Link href="/" onClick={() => setOpen(false)} className="flex flex-col items-center cursor-pointer">
                <House className="w-5 h-5" />
                <span>Accueil</span>
            </Link>
            <Link href="/search" onClick={() => setOpen(false)} className="flex flex-col items-center cursor-pointer">
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
            </Link>
            <Link href="/profile/1/list" onClick={() => setOpen(false)} className="flex flex-col items-center cursor-pointer">
                <Library className="w-5 h-5" />
                <span>Bibliothèque</span>
            </Link>
            <Link href="/profile/1/activity" onClick={() => setOpen(false)} className="flex flex-col items-center cursor-pointer">
                <Activity className="w-5 h-5" />
                <span>Activité</span>
            </Link>
        </div>
    );
}