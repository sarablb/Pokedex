"use client";

import { useState, useMemo } from "react";
import styled from "styled-components";
import { PokemonSpecies } from "@/lib/types";
import PokemonCard from "./PokemonCard";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const ControlsRow = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const ViewToggleGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  border-radius: 12px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  /* Se attivo: sfondo nero e testo bianco. Se inattivo: trasparente e testo nero */
  background: ${props => props.$active ? props.theme.colors.charcoal100 || "#060606" : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.charcoal100 || "#060606"};
  border: 1px solid ${props => props.theme.colors.charcoal100 || "#060606"};
  border-radius: 8px;
  padding: 12px;
  font-weight: 700;
  line-height: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  &:hover {
    ${props => !props.$active && `
      background: ${props.theme.colors.charcoal100 || "#060606"}20; 
      border-color: ${props.theme.colors.charcoal100 || "#060606"};
    `}
  }

  cursor: ${props => props.$active ? 'default' : 'pointer'};
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  label {
    font-weight: 700;
  }
`;

const StyledSelect = styled.select`
  padding: 8px 32px 8px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.charcoal100 || "#060606"}20;
  background-color: ${props => props.theme.colors.white};
  font-weight: 300;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;

  &:focus {
    border-color: ${props => props.theme.colors.charcoal100};
    outline: none;
  }
`;

const PokemonGrid = styled.ul<{ $isList: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: ${props => props.$isList ? "1fr" : "repeat(auto-fill, minmax(210px, 1fr))"};
  gap: 16px;
`;

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);


interface PokemonListProps {
  pokemons: PokemonSpecies[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  const [sortBy, setSortBy] = useState<string>("number-asc");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { t } = useLanguage();


  const sortedPokemons = useMemo(() => {
    const validPokes = pokemons.filter(p => p !== null && p !== undefined);

    const pokes = [...validPokes];

    switch (sortBy) {
      case "number-asc":
        return pokes.sort((a, b) => a.id - b.id);
      case "number-desc":
        return pokes.sort((a, b) => b.id - a.id);
      case "name-asc":
        return pokes.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "name-desc":
        return pokes.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      default:
        return pokes;
    }
  }, [sortBy, pokemons]);

  return (
    <div>
      <ControlsRow>
        <ViewToggleGroup>
          <ToggleButton
            $active={viewMode === "card"}
            onClick={() => setViewMode("card")}
            title={t.gridview}
          >
            <GridIcon />
          </ToggleButton>
          <ToggleButton
            $active={viewMode === "list"}
            onClick={() => setViewMode("list")}
            title={t.listview}
          >
            <ListIcon />
          </ToggleButton>
        </ViewToggleGroup>

        <SelectContainer>
          <label htmlFor="sortBy">{t.sortby}:</label>
          <StyledSelect id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="number-asc">{t.lowestfirst}</option>
            <option value="number-desc">{t.highestfirst}</option>
            <option value="name-asc">{t.nameasc}</option>
            <option value="name-desc">{t.namedesc}</option>
          </StyledSelect>
        </SelectContainer>
      </ControlsRow>

      <PokemonGrid $isList={viewMode === "list"}>
        {sortedPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.name.toLowerCase()}`}>
              <PokemonCard
                name={pokemon.name}
                id={pokemon.id}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                types={pokemon.types}
                listView={viewMode === "list"}
              />
            </Link>
          </li>
        ))}
      </PokemonGrid>
    </div>
  );
}