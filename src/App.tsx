import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { NavBar } from './layout'
import About from './widget/About'
import Feature from './widget/Feature'
import Hero from './widget/Hero'

function App() {
  gsap.registerPlugin(ScrollTrigger)

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Feature />

      <section className="min-h-screen z-0 bg-blue-400"></section>
    </main>
  )
}

export default App
