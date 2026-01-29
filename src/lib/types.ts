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
  genus?: string;
  flavor_text?: string;
  names?: { name: string; language: { name: string } }[];
  genera?: { genus: string; language: { name: string } }[];
  flavor_text_entries?: { flavor_text: string; language: { name: string } }[];
  types: { type: { name: string } }[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: { name: string };
}
