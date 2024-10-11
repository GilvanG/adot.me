import getMPTheme from '@/theme';
import { createTheme, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  const MPTheme = createTheme(getMPTheme());
  
  return (
    <ThemeProvider theme={MPTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
)
}