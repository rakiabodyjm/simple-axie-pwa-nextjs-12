import '../../styles/globals.css'
import { CssBaseline, ThemeOptions, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import type { AppProps } from 'next/app'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useEffect, useMemo, useState } from 'react'
import Layout from '@src/components/Layout'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import store from '@src/redux/store'

const options: ThemeOptions = {
  typography: {
    fontSize: 13.4,

    fontFamily: ['Montserrat', 'sans-serif', 'Playfair Display', 'serif'].join(','),
  },
  palette: {
    primary: {
      main: '#FF7600',
    },
    secondary: {
      main: '#132871',
    },
    error: {
      main: red.A400,
    },
  },
  components: {},
}

const cache = createCache({
  key: 'css',
})
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkMode)

  const theme = useMemo(
    () =>
      createTheme({
        ...options,
        palette: {
          ...options.palette,
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  )

  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <Layout
              darkMode={darkMode}
              toggleDarkMode={() => {
                setDarkMode((prevState) => !prevState)
              }}
            >
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
