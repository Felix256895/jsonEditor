import React, { useState, FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  JSONCRACK_URL,
  VSCODE
} from 'constants/url'
import { GoalsModal } from 'containers/Modals/GoalsModal'
import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa'
import {
  HiCursorClick,
  HiLightningBolt,
  HiOutlineDownload,
  HiOutlineSearchCircle
} from 'react-icons/hi'
import { SiVisualstudiocode } from 'react-icons/si'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { CarbonAds } from 'components/CarbonAds'
import { Producthunt } from 'components/Producthunt'
import { Sponsors } from 'components/Sponsors'
import pkg from '../../../package.json'
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
    <Styles.StyledNavLink href={GITHUB_URL} target="_blank" rel="external">
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
      <Styles.StyledButton rel="prefetch" href="/editor" target="_blank" link>
        GO TO EDITOR
      </Styles.StyledButton>
      <Styles.StyledButtonWrapper>
        <Styles.StyledSponsorButton onClick={() => setModalVisible(true)}>
          Help JSON Crack&apos;s Goals
          <FaHeart />
        </Styles.StyledSponsorButton>
        <Link href={VSCODE} passHref>
          <Styles.StyledSponsorButton isBlue>
            GET IT ON VS CODE
            <SiVisualstudiocode />
          </Styles.StyledSponsorButton>
        </Link>
      </Styles.StyledButtonWrapper>
      <GoalsModal visible={isModalVisible} setVisible={setModalVisible} />
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

const FeaturesSection = () => {
  const data = [
    {
      title: 'EASY-TO-USE',
      iconName: HiCursorClick,
      color: '#3BA55D',
      description: `Don&apos;t even bother to update your schema to view your JSON into graphs;
      directly paste, import or fetch! JSON Crack helps you to visualize without
      any additional values and save your time.`
    },
    {
      title: 'SEARCH',
      iconName: HiOutlineSearchCircle,
      color: '#5865F2',
      description: `Have a huge file of values, keys or arrays? Worry no more, type in the
      keyword you are looking for into search input and it will take you to each
      node with matching result highlighting the line to understand better!`
    },
    {
      title: 'EDOWNLOAD',
      iconName: HiOutlineDownload,
      color: '#DA2877',
      description: `Download the graph to your local machine and use it wherever you want, to
      your blogs, website or make it a poster and paste to the wall. Who
      wouldn&apos;t want to see a JSON Crack graph onto their wall, eh?`
    },
    {
      title: 'LIVE',
      iconName: HiLightningBolt,
      color: '#F5E027',
      description: `With Microsoft&apos;s Monaco Editor which is also used by VS Code, easily
      edit your JSON and directly view through the graphs. Also there&apos;s a JSON
      validator above of it to make sure there is no type error.`
    }
  ]
  return (
    <Styles.StyledFeaturesSection>
      {data.map(item => (
        <Styles.StyledSectionCard key={item.color}>
          <Styles.StyledCardIcon>
            <item.iconName size={50} color={item.color} />
          </Styles.StyledCardIcon>
          <Styles.StyledCardTitle>{item.title}</Styles.StyledCardTitle>
          <Styles.StyledCardDescription>
            {item.description}
          </Styles.StyledCardDescription>
        </Styles.StyledSectionCard>
      ))}
    </Styles.StyledFeaturesSection>
  )
}

const GitHubSection = () => (
  <Styles.StyledSection reverse>
    <TwitterTweetEmbed
      tweetId="1519363257794015233"
      options={{
        width: '600',
        align: 'center'
      }}
    />
    <Styles.StyledSectionArea>
      <Styles.StyledSubTitle>Open Source Community</Styles.StyledSubTitle>
      <Styles.StyledMinorTitle>
        Join the Open Source Community by suggesting new ideas, support by
        contributing; implementing new features, fixing bugs and doing changes minor
        to major!
      </Styles.StyledMinorTitle>
      <Styles.StyledButton href={GITHUB_URL} status="SECONDARY" link>
        STAR ON GITHUB
      </Styles.StyledButton>
    </Styles.StyledSectionArea>
  </Styles.StyledSection>
)

const EmbedSection = () => (
  <Styles.StyledSection id="embed">
    <Styles.StyledSectionArea>
      <Styles.StyledSubTitle>Embed Into Your Website</Styles.StyledSubTitle>
      <Styles.StyledMinorTitle>
        Easily embed the JSON Crack graph into your website to showcase your
        visitors, blog readers or anybody else!
      </Styles.StyledMinorTitle>
    </Styles.StyledSectionArea>
    <div>
      <Styles.StyledIframge src={JSONCRACK_URL} />
    </div>
  </Styles.StyledSection>
)

const SupportSection = () => (
  <Styles.StyledPaidSection>
    <Styles.StyledProducthunt>
      <Styles.StyledSubTitle>
        Support JSON Crack at
        <div>
          <Styles.StyledHighlightedText>Product Hunt</Styles.StyledHighlightedText>
        </div>
      </Styles.StyledSubTitle>
      <Producthunt />
    </Styles.StyledProducthunt>
    <Styles.StyledAffiliate>
      <Styles.StyledSubTitle>Affiliate</Styles.StyledSubTitle>
      <CarbonAds />
    </Styles.StyledAffiliate>
  </Styles.StyledPaidSection>
)

const SponsorSection = () => (
  <Styles.StyledSponsorSection>
    <Styles.StyledSubTitle>Sponsors</Styles.StyledSubTitle>
    <Styles.StyledMinorTitle>
      Your supports make JSON Crack possible to continue and accessible for everyone!
    </Styles.StyledMinorTitle>
    <Styles.StyledButton href={GITHUB_URL} rel="external" status="SUCCESS" link>
      Become A Sponsor!
    </Styles.StyledButton>
    <Sponsors />
  </Styles.StyledSponsorSection>
)

const Footer = () => (
  <Styles.StyledFooter>
    <Styles.StyledFooterText>
      © 2022 JSON Crack - {pkg.version}
    </Styles.StyledFooterText>
    <Styles.StyledIconLinks>
      <Styles.StyledNavLink
        href={GITHUB_URL}
        rel="external"
        target="_blank"
        aria-label="github"
      >
        <FaGithub size={26} />
      </Styles.StyledNavLink>

      <Styles.StyledNavLink
        href={LINKEDIN_URL}
        rel="me"
        target="_blank"
        aria-label="linkedin"
      >
        <FaLinkedin size={26} />
      </Styles.StyledNavLink>

      <Styles.StyledNavLink
        href={TWITTER_URL}
        rel="me"
        target="_blank"
        aria-label="twitter"
      >
        <FaTwitter size={26} />
      </Styles.StyledNavLink>
    </Styles.StyledIconLinks>
  </Styles.StyledFooter>
)

const Home: FC = () => (
  <Styles.StyledHome>
    <Head>
      <title>JSON Crack - Crack your data into pieces</title>
    </Head>
    <Navbar />
    <HeroSection />
    <PreviewSection />
    <FeaturesSection />
    <GitHubSection />
    <EmbedSection />
    <SupportSection />
    <SponsorSection />
    <Footer />
  </Styles.StyledHome>
)

export default Home
