import React from 'react'
import { MdReportGmailerrorred, MdOutlineCheckCircleOutline } from 'react-icons/md'
import styled from 'styled-components'

const StyledContainer = styled.div`
  z-index: 1;
`

const StyledWrapper = styled.div<{ error: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 28px;
  padding: 4px 16px;
  border-radius: 0;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme, error }) => (error ? theme.TEXT_DANGER : theme.TEXT_POSITIVE)};
  pointer-events: ${({ error }) => !error && 'none'};
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  box-shadow: 0 1px 0px ${({ theme }) => theme.BACKGROUND_TERTIARY};
`

const StyledTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  font-size: 16px;
`

export const Error: React.FC<{ hasError: boolean }> = ({ hasError }) => (
  <StyledContainer>
    <StyledWrapper error={hasError}>
      <StyledTitle>
        {hasError ? (
          <MdReportGmailerrorred size={20} />
        ) : (
          <MdOutlineCheckCircleOutline size={20} />
        )}
      </StyledTitle>
    </StyledWrapper>
  </StyledContainer>
)
