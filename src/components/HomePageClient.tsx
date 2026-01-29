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

  return (
    <>
      <header>
        <Header
          onSearch={handleSearch}
          onSurpriseMe={handleSurpriseMe}
        />
      </header>
      <main>
        <PokemonList pokemons={filtered} />
      </main>
    </>
  );
}
