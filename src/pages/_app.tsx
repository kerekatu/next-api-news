import { AppProps } from 'next/app'
import '../assets/css/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
