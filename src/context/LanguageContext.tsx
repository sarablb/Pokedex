"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  it: {
    search: "Nome o Numero",
    splaceholder: "Pikachu, #0025",
    surprise: "Sorprendimi",
    gridview: "Vista Griglia",
    listview: "Vista Lista",
    sortby: "Ordina per",
    lowestfirst: "Numero più basso (prima)",
    highestfirst: "Numero più alto (prima)",
    nameasc: "Nome A → Z",
    namedesc: "Nome Z → A",
    back: "Torna alla lista",
    errorLoading: "Errore nel caricamento del Pokémon",
    warning: "Attenzione, Allenatore!",
    connectionlost: "Il Team Rocket ha interrotto la comunicazione con il Pokédex.",
    retry: "Riprova",
    types: {
      normal: "Normale", fire: "Fuoco", water: "Acqua", grass: "Erba",
      electric: "Elettro", ice: "Ghiaccio", fighting: "Lotta", poison: "Veleno",
      ground: "Terra", flying: "Volante", psychic: "Psico", bug: "Coleottero",
      rock: "Roccia", ghost: "Spettro", dragon: "Drago", dark: "Buio",
      steel: "Acciaio", fairy: "Folletto"
    }
  },
  en: {
    search: "Name or Number",
    splaceholder: "Pikachu, #0025",
    surprise: "Surprise me",
    gridview: "Grid View",
    listview: "List View",
    sortby: "Sort by",
    lowestfirst: "Lowest number (first)",
    highestfirst: "Highest number (first)",
    nameasc: "Name A → Z",
    namedesc: "Name Z → A",
    back: "Back to list",
    errorLoading: "Error loading Pokémon",
    warning: "Attention, Trainer!",
    connectionlost: "Team Rocket has interrupted communication with the Pokédex.",
    retry: "Retry",
    types: {
      normal: "Normal", fire: "Fire", water: "Water", grass: "Grass",
      electric: "Electric", ice: "Ice", fighting: "Fighting", poison: "Poison",
      ground: "Ground", flying: "Flying", psychic: "Psychic", bug: "Bug",
      rock: "Rock", ghost: "Ghost", dragon: "Dragon", dark: "Dark",
      steel: "Steel", fairy: "Fairy"
    }
  }
};

type Language = "it" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.it;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("it");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}