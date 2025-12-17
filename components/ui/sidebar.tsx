import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

type SidebarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be inside SidebarProvider");
  return ctx;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
