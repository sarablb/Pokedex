"use client";

import styled from "styled-components";
import { TYPE_COLORS } from "@/lib/colors";
import { getContrastColor } from "@/lib/utils"; 


interface PokemonCardProps {
  name: string;
  id: number;
  image: string;
  types: string[];
  listView?: boolean; 
}


const CardContainer = styled.div<{ $isList: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$isList ? "row" : "column")};
  align-items: top;
  padding: 16px;
  gap: 12px;
  background-color: ${props => props.theme.colors.white || "#ffffff"};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.charcoal5};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.charcoal5};
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }
`;

const ImageWrapper = styled.div<{ $isList: boolean }>`
  width: ${props => (props.$isList ? "150px" : "100%")};
  height: auto;
  padding:20px;
  background-color: ${props => props.theme.colors.charcoal5};
`;

const PokemonImage = styled.img<{ $isList: boolean }>`
  object-fit: contain;
  width: 100%;
  height: auto;
`;

const InfoWrapper = styled.div<{ $isList: boolean }>`
  display: flex;
  gap:4px;
  flex-direction: column;
  text-align: ${props => (props.$isList ? "left" : "start")};
  align-items: ${props => (props.$isList ? "flex-start" : "start")};
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
  justify-content: ${props => (props.$isList ? "flex-start" : "center")};
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
  return (
    <CardContainer $isList={listView}>
      <ImageWrapper $isList={listView}>
        <PokemonImage 
          src={image} 
          alt={`${name} standing`} 
          $isList={listView} 
          loading="lazy"
        />
      </ImageWrapper>
      <InfoWrapper $isList={listView}>
        <PokemonId>#{String(id).padStart(3, '0')}</PokemonId>
        <PokemonName>{name}</PokemonName>
        <BadgeGroup $isList={listView}>
          {types.map((type) => (
            <TypeBadge 
              key={type} 
              $bgColor={TYPE_COLORS[type.toLowerCase()] || "#ccc"}
            >
              {type}
            </TypeBadge>
          ))}
        </BadgeGroup>
      </InfoWrapper>
    </CardContainer>
  );
}