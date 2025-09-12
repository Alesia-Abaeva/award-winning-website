import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { Footer, NavBar } from './layout'
import About from './widget/About'
import Contact from './widget/Contact'
import Feature from './widget/Feature'
import Hero from './widget/Hero'
import Story from './widget/Story'

function App() {
  gsap.registerPlugin(ScrollTrigger)

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Feature />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
