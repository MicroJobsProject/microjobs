import { useTheme } from "../../store/hooks";
import type { ReactNode } from "react";
import { ThemeContext } from "./context";

function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
