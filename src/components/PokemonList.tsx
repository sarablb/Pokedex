"use client";

import { useState, useMemo } from "react";
import { PokemonSpecies } from "@/lib/types";
import PokemonCard from "./PokemonCard";
import Link from "next/link";

interface PokemonListProps {
  pokemons: PokemonSpecies[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  const [sortBy, setSortBy] = useState<string>("number-asc");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  // Ordinamento
  const sortedPokemons = useMemo(() => {
    const pokes = [...pokemons];
    switch (sortBy) {
      case "number-asc":
        return pokes.sort((a, b) => a.id - b.id);
      case "number-desc":
        return pokes.sort((a, b) => b.id - a.id);
      case "name-asc":
        return pokes.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return pokes.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return pokes;
    }
  }, [sortBy, pokemons]);

  return (
    <div>
      {/* Riga superiore: toggle vista + sort */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Toggle vista con due pulsanti */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setViewMode("card")}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: viewMode === "card" ? "2px solid #333" : "1px solid #ccc",
              backgroundColor: viewMode === "card" ? "#eee" : "#fff",
              cursor: "pointer",
            }}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: viewMode === "list" ? "2px solid #333" : "1px solid #ccc",
              backgroundColor: viewMode === "list" ? "#eee" : "#fff",
              cursor: "pointer",
            }}
          >
            List View
          </button>
        </div>

        {/* Sort select */}
        <div>
          <label htmlFor="sortBy" style={{ marginRight: "8px" }}>
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "4px 8px", borderRadius: "4px" }}
          >
            <option value="number-asc">Lowest number (first)</option>
            <option value="number-desc">Highest number (first)</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
          </select>
        </div>
      </div>

      {/* Lista Pokémon */}
      <ul
        style={{
          display: "grid",
          gridTemplateColumns:
            viewMode === "card" ? "repeat(auto-fill, minmax(120px, 1fr))" : "1fr",
          gap: "16px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {sortedPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.name.toLowerCase()}`}>
              <PokemonCard
                name={pokemon.name}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                types={pokemon.types.map(t => t.type.name)}
                listView={viewMode === "list"} // passiamo la prop
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
