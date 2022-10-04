import React, { useState, FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiVisualstudiocode } from 'react-icons/si'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
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
  const handleClick = () => {
    console.log('handleClick')
  }
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
        <Styles.StyledButton rel="prefetch" href="/editor" target="_blank" link>
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
      <Styles.StyledButtonWrapper>
        <Styles.StyledSponsorButton onClick={() => setModalVisible(true)}>
          Help JSON Crack&apos;s Goals
          <FaHeart />
        </Styles.StyledSponsorButton>
      </Styles.StyledButtonWrapper>
      <Modal visible={isModalVisible} setVisible={setModalVisible}>
        <Modal.Header>test</Modal.Header>
        <Modal.Body> body</Modal.Body>
        <Modal.Footer setVisible={setModalVisible}>
          <Button onClick={() => setModalVisible(false)}>ok</Button>
        </Modal.Footer>
      </Modal>
    </Styles.StyledHeroSection>
  )
}

const PreviewSection = () => (
  <Styles.StyledPreviewSection>
    <Styles.StyledImageWrapper>
      <Styles.StyledImage
        width="1200"
        height="863"
        src="/assets/jsoncrack-screenshot.webp"
        alt="preview"
      />
    </Styles.StyledImageWrapper>
  </Styles.StyledPreviewSection>
)

const Home: FC = () => (
  <Styles.StyledHome>
    <Head>
      <title>JSON Crack - Crack your data into pieces</title>
    </Head>
    <Navbar />
    <HeroSection />
    <PreviewSection />
  </Styles.StyledHome>
)

export default Home
