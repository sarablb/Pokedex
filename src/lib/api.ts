const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151) {
  try {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    return res.json();
  } catch (error) {
    console.error("Errore lista:", error);
    return { results: [] };
  }
}

export async function getPokemonSpecies(name: string) {
  if (!name) return null;

  const lowercaseName = name.toLowerCase().trim();

  try {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`${BASE_URL}/pokemon/${lowercaseName}`),
      fetch(`${BASE_URL}/pokemon-species/${lowercaseName}`)
    ]);

    if (!pokemonRes.ok || !speciesRes.ok) return null;

    const [pokemonData, speciesData] = await Promise.all([
      pokemonRes.json(),
      speciesRes.json()
    ]);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types: pokemonData.types,
      genus: speciesData.genera.find((g: any) => g.language.name === "en")?.genus ?? "",
      flavor_text: speciesData.flavor_text_entries
        .find((f: any) => f.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ") ?? "",
    };
  } catch (error) {
    return null;
  }
}