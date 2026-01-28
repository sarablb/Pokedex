"use client";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SkeletonCard = styled.div`
  height: 300px;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 300px;
  display: inline-block;
  position: relative;
  animation: ${shimmer} 1.5s linear infinite forwards;
  border-radius: 12px;
`;

export default function Loading() {
  return (
    <SkeletonGrid>
      {/* Generiamo 12 card finte per riempire lo schermo */}
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </SkeletonGrid>
  );
}