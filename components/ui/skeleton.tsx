import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  50% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.9);
    opacity: 1;
  }
`;

const StyledSkeleton = styled.div`
  border-radius: 8px;
  background: linear-gradient(-45deg, #f0f0f0, #e0e0e0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 1.5s ease-in-out infinite;   
  /* Added properties for accessibility */
  position: relative;
  overflow: hidden;
`;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  // Additional props for customization
  width?: string | number;
  height?: string | number;
}

/**
 * A visually appealing and customizable skeleton component for placeholder/loading effect.
 * @param className - Additional classes for customization.
 * @param width - Width of the skeleton.
 * @param height - Height of the skeleton.
 * @param props - Additional HTML attributes.
 */
function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <StyledSkeleton
      className={className}

      {...props}
    />
  );
}

export { Skeleton };
