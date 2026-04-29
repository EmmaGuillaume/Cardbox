const KEY = "recentlyViewed";
const MAX = 5;

export type RecentFilm = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
};

export function addToRecentlyViewed(film: RecentFilm) {
  const stored = getRecentlyViewed();
  const filtered = stored.filter((f) => f.id !== film.id); // dédoublonne
  const next = [film, ...filtered].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getRecentlyViewed(): RecentFilm[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}