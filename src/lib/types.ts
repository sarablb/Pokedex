// Risposta della lista base della PokeAPI
export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

// Tipi completi per un singolo Pokémon
export interface PokemonSpecies {
  id: number;
  name: string;
  types: PokemonTypeSlot[];
  genus: string;
  flavor_text: string;
}

// Oggetto tipo in PokeAPI
export interface PokemonTypeSlot {
  slot: number;
  type: { name: string }; // tipo es: { name: "grass" }
}
