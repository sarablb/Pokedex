"use client";

import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onSurpriseMe: () => void;
  onViewChange: (view: "grid" | "list") => void;
}

export default function Header({ onSearch, onSurpriseMe, onViewChange }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleViewToggle = (v: "grid" | "list") => {
    setView(v);
    onViewChange(v);
  };

  return (
    <header style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
      {/* 🔹 Logo */}
      <h1 style={{ margin: 0, fontSize: "24px" }}>Pokedex</h1>

      {/* 🔹 Barra di ricerca + label + pulsante */}
      <div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
        <label htmlFor="search">Name or Number:</label>
        <input
          id="search"
          type="text"
          placeholder="Search Pokémon..."
          value={query}
          onChange={handleSearchChange}
          style={{ flex: 1, padding: "6px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={onSurpriseMe}
          style={{ padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
        >
          Surprise me
        </button>
      </div>

    </header>
  );
}
