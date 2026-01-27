import PokemonCard from "@/components/PokemonCard";
import { getPokemonSpecies } from "@/lib/api";
import { PokemonSpecies } from "@/lib/types";


interface PokemonDetailProps {
  pokemon: PokemonSpecies;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  return (
    <main style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
      <PokemonCard
        name={pokemon.name}
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        types={pokemon.types.map(t => t.type.name)}
      />

      <h2 style={{ marginTop: "16px", fontWeight: 600, fontSize: "24px", lineHeight: "36px" }}>
        {pokemon.genus}
      </h2>

      <p style={{ marginTop: "8px", fontSize: "16px", lineHeight: "24px" }}>
        {pokemon.flavor_text}
      </p>
    </main>
  );
}
