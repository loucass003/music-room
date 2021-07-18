import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      MAIN LAYOUT
      <div>{children}</div>
    </div>
  );
}