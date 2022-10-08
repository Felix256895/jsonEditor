import React from 'react'
import useStored, { Sponsor } from 'hooks/store/useStored'
import styled from 'styled-components'

const StyledSponsorsWrapper = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const StyledSponsor = styled.li<{ handler: string }>`
  display: flex;
  justify-content: center;
  position: relative;

  &:hover {
    &::before {
      content: ${({ handler }) => handler};
      position: absolute;
      top: 0;
      background: ${({ theme }) => theme.BACKGROUND_PRIMARY};
      transform: translateY(-130%);
      padding: 6px 8px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      color: ${({ theme }) => theme.TEXT_NORMAL};
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      transform: translateY(-110%);
      border-width: 5px;
      border-style: solid;
      border-color: ${({ theme }) => theme.BACKGROUND_PRIMARY} transparent
        transparent transparent;
    }
  }

  img {
    border-radius: 100%;
  }
`
const getSponsors = async () => {
  try {
    const res = await fetch(`https://ghs.vercel.app/sponsors/aykutsarac`)
    const data = await res.json()

    if (data.sponsors) {
      return data.sponsors.map(sponsor => ({
        handle: sponsor.handle,
        avatar: sponsor.avatar,
        profile: sponsor.profile
      }))
    }

    return []
  } catch (err) {
    return []
  }
}

export const Sponsors = () => {
  const { sponsors, setSponsors } = useStored()

  React.useEffect(() => {
    if (!sponsors.nextDate || sponsors.nextDate < Date.now()) {
      getSponsors().then(setSponsors)
    }
  }, [setSponsors, sponsors.nextDate])

  if (!sponsors?.users?.length) return null

  return (
    <StyledSponsorsWrapper>
      {sponsors?.users?.map((user: Sponsor) => (
        <StyledSponsor handler={user.handler} key={user.handler}>
          <a href={user.profile} target="_blank" rel="noreferrer">
            <img
              src={user.avatar}
              alt={user.handler}
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
        </StyledSponsor>
      ))}
    </StyledSponsorsWrapper>
  )
}
