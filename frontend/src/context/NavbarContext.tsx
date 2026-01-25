import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
interface NavbarContextType {
  setCenterContent: (content: ReactNode) => void;
  centerContent: ReactNode;
}

const NavbarContext = createContext<NavbarContextType>({
  setCenterContent: () => {},
  centerContent: null,
});

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [centerContent, setCenterContent] = useState<ReactNode>(null);

  return (
    <NavbarContext.Provider value={{ centerContent, setCenterContent }}>
      {children}
    </NavbarContext.Provider>
  );
};
