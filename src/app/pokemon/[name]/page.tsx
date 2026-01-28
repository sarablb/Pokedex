import { getPokemonSpecies } from "@/lib/api";
import PokemonPageClient from "@/components/PokemonPageClient";

interface PageProps {
  params: Promise<{ name?: string }>;
}

export default async function PokemonPage({ params }: PageProps) {
  const { name } = await params;

  if (!name) return <div>Name not provided</div>;

  try {
    const pokemon = await getPokemonSpecies(name);

    return <PokemonPageClient pokemon={pokemon} />;
  } catch (err) {
    return <div>Error loading Pokemon: {name}</div>;
  }
}