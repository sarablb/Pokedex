"use client";

import styled from "styled-components";
import { TYPE_COLORS } from "@/lib/colors";
import { getContrastColor } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PokemonTypeSlot } from "@/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PokemonCardProps {
  name: string;
  id: number;
  image: string;
  types: (PokemonTypeSlot | { type: { name: string } })[];
  listView?: boolean;
}

const CardContainer = styled(motion.div) <{ $isList: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$isList ? "row" : "column")};
  align-items: top;
  padding: 16px;
  gap: 12px;
  background-color: ${props => props.theme.colors.white || "#ffffff"};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.charcoal5};
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const ImageWrapper = styled.div<{ $isList: boolean }>`
  width: ${props => (props.$isList ? "120px" : "100%")};
  aspect-ratio: 1;
  padding: 20px;
  background-color: ${props => props.theme.colors.charcoal5};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const InfoWrapper = styled.div<{ $isList: boolean }>`
  display: flex;
  gap: 4px;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  width: 100%;
`;

const PokemonId = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.colors.charcoal100 || "#060606"}90;
`;

const PokemonName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
  text-transform: capitalize;
  margin: 0;
`;

const BadgeGroup = styled.div<{ $isList: boolean }>`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const TypeBadge = styled.span<{ $bgColor: string }>`
  background-color: ${props => props.$bgColor};
  color: ${props => getContrastColor(props.$bgColor)};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
`;

export default function PokemonCard({ name, id, image, types, listView = false }: PokemonCardProps) {
  const { lang, t } = useLanguage();

  // Get localized type names from PokeAPI or fallback to translations
  const getLocalizedTypeName = (typeData: any): string => {
    // Extract the actual type object if it's wrapped in { slot, type }
    const typeObj: any = typeData.type || typeData;

    // Handle string types
    if (typeof typeObj === 'string') {
      return t.types[typeObj.toLowerCase() as keyof typeof t.types] || typeObj;
    }

    // If it's an object with names from PokeAPI
    if (typeObj.names && Array.isArray(typeObj.names)) {
      const langMap = lang === "it" ? "it" : "en";
      const localizedName = typeObj.names.find((n: any) => n.language?.name === langMap)?.name;
      return localizedName || t.types[typeObj.name?.toLowerCase() as keyof typeof t.types] || typeObj.name;
    }

    // Fallback - safely handle non-string names
    const name = typeObj.name || typeObj;
    if (typeof name === 'string') {
      return t.types[name.toLowerCase() as keyof typeof t.types] || name;
    }
    return String(name);
  };

  return (
    <CardContainer
      $isList={listView}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        backgroundColor: "#f9f9f9"
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <ImageWrapper $isList={listView}>
        <Image
          src={image}
          alt={`${name} ${t.altAttack}`}
          width={listView ? 80 : 150}
          height={listView ? 80 : 150}
          style={{ objectFit: 'contain' }}
          priority={id <= 10}
        />
      </ImageWrapper>

      <InfoWrapper $isList={listView}>
        <PokemonId>#{String(id).padStart(3, '0')}</PokemonId>
        <PokemonName>{name}</PokemonName>
        <BadgeGroup $isList={listView}>
          {types.map((typeData: any) => {
            // Handle both string and object types
            const typeName = typeData.type?.name;
            const englishType = typeName.toLowerCase();
            const bgColor = TYPE_COLORS[englishType] || "#ccc";
            const translatedType = getLocalizedTypeName(typeData);

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
      </InfoWrapper>
    </CardContainer>
  );
}

/* eslint-enable @typescript-eslint/no-explicit-any */