import React from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { AnimatedTitle } from '@/components'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+800 center', // заканчивается после начала через 800 пикселей, т.е после достижения значение start
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    })
  }, [])

  return (
    <section className="min-h-screen w-screen overflow-x-hidden" id="about">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase">Welcome to Zentry</h2>

        {/* <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          Disc<b>o</b>ver the world's <br />l<b>a</b>rgest shared adventure
        </div> */}

        <AnimatedTitle
          title={`Disc<b>o</b>ver the world's <br />l<b>a</b>rgest shared adventure`}
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, noe an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both digital and
            physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default About
