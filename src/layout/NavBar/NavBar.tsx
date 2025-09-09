import React, { useEffect } from 'react'

import gsap from 'gsap'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'

import { Button } from '@/components'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

function NavBar() {
  const navContainerRef = React.useRef<HTMLDivElement | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isNavVisible, setNavVisible] = React.useState(true)

  const { y: currentScrollY } = useWindowScroll()

  const [isAudioPlaying, setAudioPlaying] = React.useState(false)
  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false)

  const toggleAudioIndicator = () => {
    setAudioPlaying((prev) => !prev)
    setIsIndicatorActive((prev) => !prev)
  }

  React.useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isAudioPlaying])

  React.useEffect(() => {
    if (currentScrollY === 0) {
      setNavVisible(true)
      navContainerRef.current?.classList.remove('floating-nav')
      setLastScrollY(currentScrollY)
      return
    }

    if (currentScrollY > lastScrollY) {
      setNavVisible(false)
      navContainerRef.current?.classList.add('floating-nav')
      setLastScrollY(currentScrollY)
      return
    }

    if (currentScrollY < lastScrollY) {
      setNavVisible(true)
      navContainerRef.current?.classList.add('floating-nav')
      setLastScrollY(currentScrollY)
      return
    }
  }, [currentScrollY, lastScrollY])

  React.useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50  h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              title="Products"
              rightIcon={<TiLocationArrow />}
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a key={index} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudioIndicator}
            >
              <audio ref={audioRef} className="hidden" src="/audio/loop.mp3" loop />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? 'active-indicator-line' : ''}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
