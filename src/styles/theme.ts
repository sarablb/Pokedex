// src/styles/theme.ts
export const theme = {
  colors: {
    grass: "#9BCC50",
    poison: "#B97FC9",
    fire: "#FD7D24",
    water: "#4592C4",
    charcoal100: "#060606",
    charcoal10: "#ECECEF",
    charcoal5: "#F4F4F6",
    white: "#FFFFFF",
  },
  fonts: {
    main: "'Manrope', sans-serif", 
  },
  typography: {
    h1: { size: "32px", height: "40px" },
    h3: { size: "24px", height: "36px" },
    bodyMd: { size: "16px", height: "24px" },
    caption: { size: "12px", height: "16px" },
  }
} as const;