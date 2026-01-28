"use client";
import styled from 'styled-components';
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onSurpriseMe: () => void;
  onViewChange: (view: "grid" | "list") => void;
}

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.charcoal10 || "#ECECEF"};
`;

const TitleContainer = styled.header`
  background-color: ${props => props.theme.colors.charcoal100 || "#060606"};
`;

const Title = styled.h1`
  max-width: 1200px;
  margin: 0 auto;
  padding:20px;
  font-size: 32px;
  line-height: 40px;
  color: ${props => props.theme.colors.white || "#ffffff"};
  background-color: ${props => props.theme.colors.charcoal100 || "#060606"};
  font-weight: 600;
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding:20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchLabel = styled.label`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  width:350px;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.charcoal100 || "#060606"}30;
  border-radius: 8px;
  padding: 10px 14px;
  gap: 8px;
  background-color: white;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus-within {
    border-color: ${props => props.theme.colors.charcoal100 || "#060606"};
    box-shadow: 0 0 0 1px ${props => props.theme.colors.charcoal100 || "#060606"};
  }
`;

const SearchInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  &::placeholder {
    color: ${props => props.theme.colors.charcoal100 || "#060606"};
  }
`;

const SurpriseButton = styled.button`
  color: ${props => props.theme.colors.charcoal100 || "#060606"};
  border: 1px solid ${props => props.theme.colors.charcoal100 || "#060606"};
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.colors.charcoal100|| "#060606"}20;
  }
`;

export default function Header({ onSearch, onSurpriseMe, onViewChange }: HeaderProps) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>Pokedex</Title>
      </TitleContainer>

      <SearchSection>
        <SearchLabel htmlFor="search">Name or Number</SearchLabel>
        <InputRow>
          <SearchWrapper>
            <SearchInput
              id="search"
              type="text"
              placeholder="Pikachu, #0025"
              value={query}
              onChange={handleSearchChange}
            />
            <span>🔎</span>
          </SearchWrapper>
          
          <SurpriseButton onClick={onSurpriseMe}>
            Surprise me
          </SurpriseButton>
        </InputRow>
      </SearchSection>
    </HeaderContainer>
  );
}