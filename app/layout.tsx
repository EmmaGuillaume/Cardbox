import type { Metadata } from "next";
import "./globals.css";
import TapBar from "@/components/features/TapBar";
import NavBarMobile from "@/components/features/NavBarMobile";
import NavBarDesktop from "@/components/features/NavBarDesktop";
import UserDrawerDesktop from "@/components/features/UserDrawerDesktop";
import { DrawerProvider } from "@/components/context/DrawerContext";
import { AuthModalProvider } from "@/components/context/AuthModalContext";
import AuthModal from "@/components/features/AuthModal";
import Footer from "@/components/ui/Footer";
import UserDrawerMobile from "@/components/features/UserDrawerMobile";
import { ReactQueryProvider } from '@/providers/query-client';

export const metadata: Metadata = {
  title: "Cardboxd",
  description: "Letterboxd mais en mieux",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col bg-background text-primary font-krub">
        <ReactQueryProvider>
          <AuthModalProvider>
            <DrawerProvider>
              <NavBarMobile />
              <NavBarDesktop />

              <div className="flex flex-1 overflow-hidden fixed top-16 left-0 right-0 bottom-0">
                <main className="flex-1 overflow-y-auto scrollbar-custom">
                  {children}
                  <footer>
                    <Footer />
                  </footer>
                </main>
                <UserDrawerDesktop />
              </div>

              <UserDrawerMobile />
              <TapBar />

              {/* Modale d'authentification globale */}
              <AuthModal />
            </DrawerProvider>
          </AuthModalProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
