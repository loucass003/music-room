import { ReactNode } from "react";
import { Navbar } from "../commons/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-4">{children}</div>
    </div>
  );
}