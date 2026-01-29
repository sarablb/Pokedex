"use client";

import styled from "styled-components";
import { TYPE_COLORS } from "@/lib/colors";
import { getContrastColor } from "@/lib/utils"; 
import { motion } from "framer-motion"; 
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface PokemonCardProps {
  name: string;
  id: number;
  image: string;
  types: string[];
  listView?: boolean; 
}

const CardContainer = styled(motion.div)<{ $isList: boolean }>`
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
  const { t } = useLanguage();
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
          alt={name}
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
          {types.map((type) => {
            const englishType = type.toLowerCase();
            const bgColor = TYPE_COLORS[englishType] || "#ccc";
            const translatedType = t.types[englishType as keyof typeof t.types] || type;

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