import { ReactNode } from "react";
import { Navbar } from "../commons/Navbar";
import { Box } from "../commons/ui/Box";
import { ConversationList } from "../conversation/ConversationsList";

interface ConversationLayoutProps {
  children: ReactNode;
}

export function ConversationLayout({ children }: ConversationLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Navbar></Navbar>
      </div>
      <div className="flex h-full mb-4 flex-col">
        <div className="flex mx-4 gap-4 h-full">
          <Box insideSpacing className="h-full w-1/3 max-w-sm">
            <ConversationList></ConversationList>
          </Box>
          <Box className="h-full flex-grow">
            {children}
          </Box>
        </div>
      </div>
    </div>
  );
}