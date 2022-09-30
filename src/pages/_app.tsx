import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { init } from '@sentry/nextjs'
import { decompress } from 'compress-json'
import GlobalStyle from 'constants/globalStyle'
import { lightTheme, darkTheme } from 'constants/theme'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'styled-components'
import { isValidJson } from 'utils/isValidJson'

if (process.env.NODE_ENV !== 'development') {
  init({
    dsn: 'https://d3345591295d4dd1b8c579b62003d939@o1284435.ingest.sentry.io/6495191',
    tracesSampleRate: 0.5
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter()

  useEffect(() => {
    const validJson =
      typeof query.json === 'string' && isValidJson(decodeURIComponent(query.json))

    if (validJson) {
      const jsonDecode = decompress(JSON.parse(validJson))
      const jsonString = JSON.stringify(jsonDecode)
    }
  }, [query.json])
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#4D4D4D',
              color: '#B9BBBE'
            }
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default MyApp
