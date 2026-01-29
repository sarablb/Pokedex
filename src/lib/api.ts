const BASE_URL = "https://pokeapi.co/api/v2";
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getPokemonList(limit = 151) {
  try {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    return res.json();
  } catch {
    return { results: [] };
  }
}

export async function getPokemonSpecies(name: string) {
  if (!name) return null;

  const lowercaseName = name.toLowerCase().trim();

  try {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`${BASE_URL}/pokemon/${lowercaseName}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      }),
      fetch(`${BASE_URL}/pokemon-species/${lowercaseName}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      })
    ]);

    if (!pokemonRes.ok || !speciesRes.ok) return null;

    const [pokemonData, speciesData] = await Promise.all([
      pokemonRes.json(),
      speciesRes.json()
    ]);

    // Fetch localized type names
    const enrichedTypes = await Promise.all(
      pokemonData.types.map(async (typeSlot: any) => {
        try {
          const typeRes = await fetch(`${BASE_URL}/type/${typeSlot.type.name}`, {
            next: { revalidate: 3600 }
          });
          if (!typeRes.ok) return typeSlot;
          const typeData = await typeRes.json();
          return {
            ...typeSlot,
            type: {
              ...typeSlot.type,
              names: typeData.names
            }
          };
        } catch {
          return typeSlot;
        }
      })
    );

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types: enrichedTypes,
      genera: speciesData.genera, // Keep all genera for multi-language support
      flavor_text_entries: speciesData.flavor_text_entries, // Keep all entries for multi-language support
      genus: speciesData.genera.find((g: any) => g.language.name === "en")?.genus ?? "",
      flavor_text: speciesData.flavor_text_entries
        .find((f: any) => f.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").trim() ?? "",
    };
  } catch {
    return null;
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */