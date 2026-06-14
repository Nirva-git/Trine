import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Portfolio from '../components/Portfolio'
import Clients from '../components/Clients'
import Contact from '../components/Contact'
import Careers from '../components/Careers'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Portfolio />
      <Clients />
      <Contact />
      <Careers />
    </main>
  )
}
