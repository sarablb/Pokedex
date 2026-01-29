'use client';

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import StyledComponentsRegistry from "./registry";
import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}