"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useLanguage } from "@/context/LanguageContext";


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
    console.error(error);
  }, [error]);
  const { t } = useLanguage();
  return (
    <ErrorContainer>
      <h2>{t.warning}</h2>
      <p>{t.connectionlost}</p>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>{error.message}</p>
      <RetryButton onClick={() => reset()}>{t.retry}</RetryButton>
    </ErrorContainer>
  );
}