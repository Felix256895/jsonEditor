import React from 'react'

interface SeoTagsProps {
  title: string
  description: string
  image: string
}

export const SeoTags: React.FC<SeoTagsProps> = ({ title, description, image }) => (
  <>
    <meta name="description" content={description} />
    <meta property="og:url" content="http://localhost:3000" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </>
)
