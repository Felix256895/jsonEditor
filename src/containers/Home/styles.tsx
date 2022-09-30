import styled from 'styled-components'
import { Button } from 'components/Button'

export const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 18px;
`

export const StyledImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8em;
  font-family: 'Roboto', sans-serif;

  @media only screen and (max-width: 768px) {
    gap: 3em;
  }
`

export const StyledGradientText = styled.span`
  background: #ffb76b;
  background: linear-gradient(
    to right,
    #ffb76b 0%,
    #ffa73d 30%,
    #ff7c00 60%,
    #ff7f04 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    a:first-of-type {
      display: none;
    }
  }
`

export const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5em;
  min-height: 40vh;
  padding: 0 3%;
`

export const StyledNavLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.ORANGE};
    font-weight: 500;
  }
`

export const StyledTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 3rem;
  }
`

export const StyledSubTitle = styled.h2`
  color: #dedede;
  text-align: center;
  font-size: 2.5rem;
  max-width: 40rem;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1.75rem;
  }
`

export const StyledHighlightedText = styled.span`
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: #eab308;
`

export const StyledMinorTitle = styled.p`
  text-align: center;
  color: #b4b4b4;
  font-size: 1.25rem;
  margin: 0;
  letter-spacing: 2px;

  @media only screen and (max-width: 992px) {
    font-size: 1rem;
  }
`

export const StyledButton = styled(Button)`
  background: ${({ status }) => !status && '#a13cc2'};
  padding: 12px 24px;

  div {
    font-size: 16px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
  }
`

export const StyledSponsorButton = styled(Button)<{ isBlue?: boolean }>`
  background: transparent;
  border: 1px solid ${({ isBlue }) => (isBlue ? '#1F9CF0' : '#ee3d48')};
  transition: all 200ms;
  padding: 12px 24px;

  div {
    font-size: 16px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
  }

  svg {
    color: ${({ isBlue }) => (isBlue ? '#1F9CF0' : '#ee3d48')};
  }

  &:hover {
    background: ${({ isBlue }) => (isBlue ? '#1F9CF0' : '#ee3d48')};

    svg {
      color: ${({ theme }) => theme.FULL_WHITE};
    }
  }

  @media only screen and (max-width: 768px) {
    display: ${({ isBlue }) => isBlue && 'none'};
  }
`
