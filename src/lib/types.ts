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

export interface PokemonSpecies {
  id: number;
  name: string;
  types: PokemonTypeSlot[];
  genus: string;
  flavor_text: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: { name: string };
}
