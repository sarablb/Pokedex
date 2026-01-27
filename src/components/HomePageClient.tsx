"use client";

import { useState } from "react";
import { PokemonSpecies } from "@/lib/types";
import Header from "./Header";
import PokemonList from "./PokemonList";

interface HomePageClientProps {
  pokemons: PokemonSpecies[];
}

export default function HomePageClient({ pokemons }: HomePageClientProps) {
  const [filtered, setFiltered] = useState(pokemons);
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    setFiltered(
      pokemons.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toString() === q
      )
    );
  };

  const handleSurpriseMe = () => {
    const random = pokemons[Math.floor(Math.random() * pokemons.length)];
    window.location.href = `/pokemon/${random.name.toLowerCase()}`;
  };

  const handleViewChange = (v: "grid" | "list") => setView(v);

  return (
    <div>
      <Header
        onSearch={handleSearch}
        onSurpriseMe={handleSurpriseMe}
        onViewChange={handleViewChange}
      />
      <PokemonList pokemons={filtered} />
    </div>
  );
}
