"use client";
import { House, Search, Library, Activity} from "lucide-react";

export default function TapBar() {
    return (
        <div className="w-full h-16 px-4 bg-background-800 flex justify-around items-center fixed bottom-0 border-t border-background-700 backdrop-blur-lg bg-opacity-80 font-krub font-size-2xs">
            <button className="flex flex-col items-center cursor-pointer">
                <House className="w-6 h-6" />
                <span className="text-xs">Accueil</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Search className="w-6 h-6" />
                <span className="text-xs">Rechercher</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Library className="w-6 h-6" />
                <span className="text-xs">Bibliothèque</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <Activity className="w-6 h-6" />
                <span className="text-xs">Activité</span>
            </button>
        </div>
    );
}