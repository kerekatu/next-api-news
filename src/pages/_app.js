import '../assets/css/global.scss'
import Header from '../components/Header/Header'
import { SettingsProvider } from '../context/SettingsContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <div className="container">
        <Header />
        <main className="main-content">
          <Component {...pageProps} />
        </main>
      </div>
    </SettingsProvider>
  )
}

export default MyApp
