'use client';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 1. Reset base */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 2. Setup Body & Typography */
  body {
    font-family: var(--font-manrope), sans-serif;
    background-color: ${props => props.theme.colors.white || "#ffffff"};
    color: ${props => props.theme.colors.charcoal100 || "#060606"};
    line-height: 1.5;
    overflow-x: hidden;
  }

  /* 3. Link: Togliamo l'underline e forziamo il colore del testo */
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  /* 4. Liste: Fondamentale per la Grid dei Pokemon */
  ul, ol {
    list-style: none;
  }

  /* 5. Form elements: Reset fondamentale per la Search Bar */
  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  /* 6. Immagini: Evita che escano dai contenitori (card) */
  img {
    max-width: 100%;
    display: block;
  }

  /* 7. Utilities per il testo (opzionale ma utile) */
  strong {
    font-weight: 700;
  }
`;