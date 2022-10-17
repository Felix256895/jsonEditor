import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    filter: drop-shadow(2px 4px 6px black);
  }
`
const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.TEXT_DANGER};
`

const StyledInfo = styled.p`
  width: 60%;
  text-align: center;
  color: ${({ theme }) => theme.TEXT_NORMAL};
`

export const ErrorView = () => (
  <StyledContainer>
    <img
      src="/assets/undraw_qa_engineers_dg-5-p.svg"
      width="200"
      height="200"
      alt="oops"
    />
    <StyledTitle>JSON unable to handle this file!</StyledTitle>
    <StyledInfo>
      We apologize for the problem you encountered, we are doing our best as Open
      Source community to improve our service. JSON Crack is currently unable to
      handle such a huge file.
    </StyledInfo>
  </StyledContainer>
)
