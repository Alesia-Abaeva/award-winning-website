import React from 'react'

import { TiLocationArrow } from 'react-icons/ti'

import { Button } from '@/components'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = React.useState(1)
  const [hasClicked, setHasClicked] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const [loadedVideos, setLoadedVideos] = React.useState(0)

  const totalVideo = 3

  const nexVideoRef = React.useRef<HTMLVideoElement | null>(null)

  //   0 / 4 => 0 + 1 => 1
  //   1 / 4 => 1 + 1 => 2
  //   2 / 4 => 2 + 1 => 3
  //   3 / 4 => 3 + 1 => 4
  //   4 / 4 => 0 + 1 => 1
  const upcomingVideoIndex = (currentIndex % totalVideo) + 1

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex(upcomingVideoIndex)
  }

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  const getVideoSource = (index: number) => `videos/hero-${index}.mp4`

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-xl bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 siz-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nexVideoRef}
                src={getVideoSource(upcomingVideoIndex)}
                loop
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>
        </div>
        <video
          ref={nexVideoRef}
          src={getVideoSource(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
        />
        <video
          ref={nexVideoRef}
          src={getVideoSource(currentIndex === totalVideo - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          //   id="next-video"
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoaded}
        />
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-40">
        G<b>a</b>ming
      </h1>

      <div className="absolute left-0 top-0 z-10 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100">
            redefi<b>n</b>e
          </h1>

          <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
            Enter the Metagame Layer
            <br /> Unleash the Play Economy
          </p>

          <Button
            id="watch-trailer"
            title="Watch trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
