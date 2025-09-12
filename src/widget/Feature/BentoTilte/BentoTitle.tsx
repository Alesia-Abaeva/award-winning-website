import React from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

type BentoTitleProps = React.PropsWithChildren & { className: string }

const BentoTitle = ({ children, className }: BentoTitleProps) => {
  const [transformStyle, setTransformStyle] = React.useState('')

  const itemRef = React.useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!itemRef.current) return

    const { left, top, height, width } = itemRef.current.getBoundingClientRect()

    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    const tiltX = (relativeX - 0.5) * 5
    const tiltY = (relativeY - 0.5) * -5

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`

    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('')
  }

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

export default BentoTitle
