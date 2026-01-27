// 🔹 URL base corretto PokeAPI
export const BASE_URL = "https://pokeapi.co/api/v2";

// 1️⃣ Lista Pokémon
export async function getPokemonList(limit = 151) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
}

// 2️⃣ Dati completi Pokémon
export async function getPokemonSpecies(name: string) {
  if (!name) throw new Error("Missing name parameter");

  const lowercaseName = name.toLowerCase();

  const pokemonRes = await fetch(`${BASE_URL}/pokemon/${lowercaseName}`);
  if (!pokemonRes.ok) throw new Error("Failed to fetch pokemon");

  const pokemonData = await pokemonRes.json();

  // fetch specie per flavor_text e genus
  const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${lowercaseName}`);
  if (!speciesRes.ok) throw new Error("Failed to fetch pokemon species");

  const speciesData = await speciesRes.json();

  const types = pokemonData.types;

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    types,
    genus: speciesData.genera.find((g: any) => g.language.name === "en")?.genus ?? "",
    flavor_text: speciesData.flavor_text_entries.find((f: any) => f.language.name === "en")?.flavor_text ?? "",
  };
}
