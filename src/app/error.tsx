"use client";

import { useEffect } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  gap: 20px;
`;

const RetryButton = styled.button`
  background: #e3350d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #b12a0a; }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logga l'errore su un servizio di monitoraggio (opzionale per il test)
    console.error(error);
  }, [error]);

  return (
    <ErrorContainer>
      <h2>Attenzione, Allenatore!</h2>
      <p>Il Team Rocket ha interrotto la comunicazione con il Pokédex.</p>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>{error.message}</p>
      <RetryButton onClick={() => reset()}>Riprova</RetryButton>
    </ErrorContainer>
  );
}