"use client";
import { createContext, useContext, useState } from "react";

type Mode = "signin" | "signup";

type Ctx = {
  open: boolean;
  mode: Mode;
  openModal: (mode?: Mode) => void;
  closeModal: () => void;
  setMode: (mode: Mode) => void;
};

const AuthModalContext = createContext<Ctx>({
  open: false,
  mode: "signin",
  openModal: () => {},
  closeModal: () => {},
  setMode: () => {},
});

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("signin");

  const openModal = (m: Mode = "signin") => {
    setMode(m);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <AuthModalContext.Provider
      value={{ open, mode, openModal, closeModal, setMode }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => useContext(AuthModalContext);
