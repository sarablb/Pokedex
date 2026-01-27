import { getPokemonSpecies } from "@/lib/api";
import { PokemonSpecies } from "@/lib/types";
import Link from "next/link";
import PokemonDetail from "./PokemonDetail";

interface PageProps {
  params: Promise<{ name?: string }>;
}

export default async function PokemonPage({ params }: PageProps) {
  const { name } = await params;

  if (!name) {
    return <div>Pokemon not found: missing name parameter</div>;
  }

  try {
    const pokemon: PokemonSpecies = await getPokemonSpecies(name);

    return (
      <div style={{ padding: "16px" }}>
        {/* Pulsante Back */}
        <Link href="/" style={{ display: "inline-block", marginBottom: "16px" }}>
          ← Back to list
        </Link>

        {/* Dettagli Pokémon */}
        <PokemonDetail pokemon={pokemon} />
      </div>
    );
  } catch (err) {
    return <div>Pokemon not found: {name}</div>;
  }
}
