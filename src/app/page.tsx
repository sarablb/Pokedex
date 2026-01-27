import { getPokemonList, getPokemonSpecies } from "@/lib/api";
import { PokemonSpecies } from "@/lib/types";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  const listData = await getPokemonList();

  const pokemons: PokemonSpecies[] = await Promise.all(
    listData.results.map((p: { name: string }) => getPokemonSpecies(p.name))
  );

  return <HomePageClient pokemons={pokemons} />;
}
