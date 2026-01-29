import PokemonPageClient from "@/components/PokemonPageClient";
import { notFound } from "next/navigation";

interface CustomPageProps {
  params: Promise<{ name: string }>;
}

async function getFullPokemonData(nameOrId: string) {
  try {
    const resDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!resDetail.ok) return null;
    const detailData = await resDetail.json();

    const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${detailData.id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!resSpecies.ok) return null;
    const speciesData = await resSpecies.json();

    return { ...detailData, ...speciesData };
  } catch {
    return null;
  }
}

export default async function PokemonPage({ params }: CustomPageProps) {
  const { name } = await params;

  if (!name) return notFound();

  const pokemon = await getFullPokemonData(name.toLowerCase());

  if (!pokemon) return notFound();

  return <PokemonPageClient pokemon={pokemon} />;
}