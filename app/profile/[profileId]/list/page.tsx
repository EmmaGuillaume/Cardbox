"use client";
import AuthGate from "@/components/features/AuthGate";
import List from "@/components/ui/List";
import { useAuth } from "@/hooks/use-auth";
import {
  useCreateList,
  useListMovieIds,
  useUserLists,
} from "@/hooks/use-lists";
import { useMovie } from "@/hooks/use-movies";
import type { Tables } from "@/types/database.types";
import { Loader2, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w185";
const PLACEHOLDER = "/placeholder.png";

type UserList = Tables<"list">;

/**
 * Petit hook utilitaire : prend un id TMDB et renvoie ce dont List a besoin
 * ({ title, src }). On utilise useMovie qui est déjà cache react-query.
 */
function useMovieListItem(movieApiId: string | undefined) {
  const id = movieApiId ? Number(movieApiId) : 0;
  const { data } = useMovie(id);

  return {
    title: data?.title ?? "",
    src: data?.poster_path
      ? `${TMDB_IMAGE_BASE}${data.poster_path}`
      : PLACEHOLDER,
  };
}

function UserListCard({
  list,
  username,
  avatar,
  onClick,
}: {
  list: UserList;
  username: string;
  avatar: string;
  onClick: () => void;
}) {
  const { data: movieIds } = useListMovieIds(list.id);
  const firstFour = (movieIds ?? []).slice(0, 4);

  // On appelle quatre fois useMovie avec une slot fixe.
  // Les ids vides désactivent le fetch (enabled: !!id dans useMovie).
  const m0 = useMovieListItem(firstFour[0]);
  const m1 = useMovieListItem(firstFour[1]);
  const m2 = useMovieListItem(firstFour[2]);
  const m3 = useMovieListItem(firstFour[3]);

  // On ne montre que les slots qui correspondent à un vrai film en DB.
  const items = [m0, m1, m2, m3]
    .slice(0, firstFour.length)
    .map((m) => ({
      title: m.title || "Film",
      src: m.src,
    }));

  // Si la liste est vide, on affiche au moins un placeholder pour garder le visuel.
  const displayItems =
    items.length > 0
      ? items
      : [{ title: "Liste vide", src: PLACEHOLDER }];

  return (
    <div onClick={onClick} className="cursor-pointer">
      <List
        onClick={onClick}
        title={list.name}
        author={username}
        avatar={avatar}
        items={displayItems}
      />
    </div>
  );
}

function ListsContent() {
  const router = useRouter();
  const params = useParams<{ profileId: string }>();
  const { user, profile } = useAuth();
  const { data: lists, isLoading } = useUserLists(user?.id);
  const createList = useCreateList(user?.id);

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createList.mutateAsync({ name: newName.trim() });
    setNewName("");
    setCreating(false);
  };

  const username = profile?.username ?? "Vous";
  const avatar = profile?.avatar_url || "https://i.pravatar.cc/80";

  return (
    <div className="h-full px-4 md:px-32 py-8 text-primary font-krub flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-merryweather text-2xl">
          Mes <span className="text-yellow">listes</span>
        </h1>
        <button
          onClick={() => setCreating((v) => !v)}
          className="flex items-center gap-2 bg-background-800 hover:bg-background-700 border border-transparent hover:border-background-600 rounded-md px-3 py-1.5 text-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nouvelle liste
        </button>
      </div>

      {creating && (
        <form
          onSubmit={handleCreate}
          className="flex gap-2 bg-background-900 border border-background-800 rounded-md p-3"
        >
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom de la liste"
            className="flex-1 bg-background-800 border border-transparent focus:border-background-600 rounded-md px-3 py-2 focus:outline-none placeholder:text-primary/30"
          />
          <button
            type="submit"
            disabled={createList.isPending}
            className="bg-primary text-background font-bold rounded-md px-4 py-2 hover:bg-primary/90 disabled:opacity-60 cursor-pointer"
          >
            {createList.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Créer"
            )}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
        </div>
      ) : !lists || lists.length === 0 ? (
        <div className="text-primary/50 text-sm bg-background-900 border border-background-800 rounded-md p-8 text-center">
          Aucune liste pour le moment. Créez-en une pour commencer.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <li key={list.id}>
              <UserListCard
                list={list}
                username={username}
                avatar={avatar}
                onClick={() =>
                  router.push(
                    `/profile/${params.profileId}/list/${list.id}`,
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ListsPage() {
  return (
    <AuthGate message="Connectez-vous pour accéder à vos listes.">
      <ListsContent />
    </AuthGate>
  );
}
