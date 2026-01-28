"use client";
import styled from "styled-components";
import Link from "next/link";
import PokemonDetail from "./PokemonDetail";

const PageContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
  border: 1px solid ${props => props.theme.colors.charcoal100 || "#060606"};
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.colors.charcoal100 || "#060606"}20;
  }
`;

export default function PokemonPageClient({ pokemon }: { pokemon: any }) {
  return (
    <PageContainer>
      <BackLink href="/">← Back to list</BackLink>
      <PokemonDetail pokemon={pokemon} />
    </PageContainer>
  );
}