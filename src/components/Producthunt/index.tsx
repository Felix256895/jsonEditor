import React from 'react'
import { PRODUCTHUNT, PRODUCTHUNT_API } from 'constants/url'
import styled from 'styled-components'

const StyledImage = styled.img`
  max-width: 300px;
  display: block;

  @media only screen and (max-width: 768px) {
    max-width: 250px;
  }
`

const StyledProducthuntWrapper = styled.div``

export const Producthunt: React.FC = () => (
  <StyledProducthuntWrapper>
    <a
      href={`${PRODUCTHUNT}/posts/json-crack?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-json&#0045;crack`}
      target="_blank"
      rel="noreferrer"
    >
      <StyledImage
        width="300"
        height="64"
        src={`${PRODUCTHUNT_API}/widgets/embed-image/v1/featured.svg?post_id=332281&theme=neutral`}
        alt="JSON Crack - Simple visualization tool for your JSON data. | Product Hunt"
        loading="lazy"
      />
    </a>
  </StyledProducthuntWrapper>
)