"use client";

import styled from "styled-components";
import { PokemonSpecies } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/colors";
import { getContrastColor } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface PokemonDetailProps {
  pokemon: PokemonSpecies;
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 60px;
`;

const BigImageWrapper = styled.div`
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Possiamo aggiungere un cerchio di sfondo leggero */
  background: ${props => props.theme.colors.charcoal10 || "#ECECEF"};
  border-radius: 50%;
`;

const BigPokemonImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PokemonId = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: capitalize;
  margin: 0;
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
`;

const GenusText = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
  margin-bottom: 16px;
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const TypeBadge = styled.span<{ $bgColor: string }>`
  background-color: ${props => props.$bgColor};
  color: ${props => getContrastColor(props.$bgColor)};
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
  margin-top: 20px;
`;

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const { lang, t } = useLanguage();

  // Get localized type names from PokeAPI or fallback to translations
  const getLocalizedTypeName = (typeData: any) => {
    if (!typeData.names) return t.types[typeData.name as keyof typeof t.types] || typeData.name;
    
    const langMap = lang === "it" ? "it" : "en";
    const localizedName = typeData.names.find((n: any) => n.language.name === langMap)?.name;
    return localizedName || t.types[typeData.name as keyof typeof t.types] || typeData.name;
  };

  return (
    <DetailContainer>
      <BigImageWrapper>
        <BigPokemonImage
          src={imageUrl}
          alt={`${pokemon.name} in an attack pose`}
        />
      </BigImageWrapper>

      <InfoGroup>
        <PokemonId>#{String(pokemon.id).padStart(3, '0')}</PokemonId>
        <PokemonName>{pokemon.name}</PokemonName>
        <GenusText>
          {(() => {
            const apiLang = lang === "it" ? "it" : "en";
            const genusEntry = pokemon.genera?.find(
              (g: any) => g.language.name === apiLang
            );
            return genusEntry ? genusEntry.genus : "";
          })()}
        </GenusText>
        <BadgeGroup>
          {pokemon.types.map((typeSlot: any) => {
            const englishType = typeSlot.type.name.toLowerCase();
            const bgColor = TYPE_COLORS[englishType] || "#ccc";
            const translatedType = getLocalizedTypeName(typeSlot.type);

            return (
              <TypeBadge
                key={englishType}
                $bgColor={bgColor}
              >
                {translatedType}
              </TypeBadge>
            );
          })}
        </BadgeGroup>
      </InfoGroup>

      <Description>
        {(() => {
          const apiLang = lang === "it" ? "it" : "en";
          const flavorEntry = pokemon.flavor_text_entries?.find(
            (entry: any) => entry.language.name === apiLang
          );
          const textToClean = flavorEntry ? flavorEntry.flavor_text : pokemon.flavor_text;
          return textToClean?.replace(/[\f\n\t\r]/g, " ");
        })()}
      </Description>
    </DetailContainer>
  );
}

/* eslint-enable @typescript-eslint/no-explicit-any */