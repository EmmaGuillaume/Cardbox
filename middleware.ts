import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On délègue le "gating" des pages privées à un composant client (AuthGate)
 * qui ouvre la modale de connexion. Le middleware ici ne fait QUE rafraîchir
 * la session Supabase via les cookies — c'est le pattern recommandé par @supabase/ssr.
 *
 * Aucune redirection : l'utilisateur peut naviguer où il veut, l'AuthGate
 * affichera la modale au bon moment.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Touche la session pour forcer le refresh du token si besoin.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optim images)
     * - favicon.ico
     * - fichiers à extension (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
