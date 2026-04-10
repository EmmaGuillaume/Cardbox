"use client";
import { House, Search, Library, Activity} from "lucide-react";

export default function TapBar() {
    return (
        <div className="w-full h-16 px-4 bg-background-900 flex justify-around items-center fixed bottom-0 border-t border-background-800 backdrop-blur-lg bg-opacity-80 text-primary font-krub text-xs lg:hidden">
            <button className="flex flex-col items-center cursor-pointer">
                <House className="w-5 h-5" />
                <span>Accueil</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Library className="w-5 h-5" />
                <span>Bibliothèque</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Activity className="w-5 h-5" />
                <span>Activité</span>
            </button>
        </div>
    );
}