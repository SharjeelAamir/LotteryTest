import '../styles/globals.css'
import '../components/header/header.scss'
import '../components/landing/landing.scss'
import '../components/landing/cosmicard.scss'
import '../components/landing/classicCard.scss'
import '../components/landing/atomicCards.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
