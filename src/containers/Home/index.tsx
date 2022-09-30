import React, { useState, FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { SiVisualstudiocode } from 'react-icons/si'
import * as Styles from './styles'

const Navbar = () => (
  <Styles.StyledNavbar>
    <Styles.StyledNavLink href="/editor">Editor</Styles.StyledNavLink>
    <Link href="#features" passHref>
      <Styles.StyledNavLink>Features</Styles.StyledNavLink>
    </Link>
    <Link href="#sponsor" passHref>
      <Styles.StyledNavLink>Sponsor</Styles.StyledNavLink>
    </Link>
    <Styles.StyledNavLink
      href="https://github.com/Felix256895/jsonEditor"
      target="_blank"
      rel="external"
    >
      Github
    </Styles.StyledNavLink>
  </Styles.StyledNavbar>
)

const HeroSection = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <Styles.StyledHeroSection>
      <Styles.StyledTitle>
        <Styles.StyledGradientText>JSON</Styles.StyledGradientText> Crack
      </Styles.StyledTitle>
      <Styles.StyledSubTitle>
        Seamlessly visualize your JSON data{' '}
        <Styles.StyledHighlightedText>instantly</Styles.StyledHighlightedText> into
        graphs.
      </Styles.StyledSubTitle>
      <Styles.StyledMinorTitle>Paste - Import - Fetch!</Styles.StyledMinorTitle>
      <Styles.StyledButtonWrapper>
        <Styles.StyledButton link rel="prefetch" href="/editor" target="_blank">
          GO TO EDITOR
        </Styles.StyledButton>
        <Link
          href="https://marketplace.visualstudio.com/items?itemName=AykutSarac.jsoncrack-vscode"
          passHref
        >
          <Styles.StyledSponsorButton isBlue>
            GET IT ON VS CODE
            <SiVisualstudiocode />
          </Styles.StyledSponsorButton>
        </Link>
      </Styles.StyledButtonWrapper>
    </Styles.StyledHeroSection>
  )
}

const Home: FC = () => (
  <Styles.StyledHome>
    <Head>
      <title>JSON Crack - Crack your data into pieces</title>
    </Head>
    <Navbar />
    <HeroSection />
  </Styles.StyledHome>
)

export default Home
