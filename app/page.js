'use client'
import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ProductTabs from '@/components/ProductTabs'
import Link from 'next/link'


export default function Home() {
  'use client'
  const autoplayOptions = {
    stopOnInteraction: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  }
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)])

  return (
    <div className='max-w-[100vw]'>
      <ProductTabs />
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className='grid justify-center'>
              <img className=' text-center' src="/marquee/slide1.jpg" alt="" />
            </div>
          </div>
          <div className="embla__slide">
            <div className='grid justify-center'>
            <img className=' text-center' src="/marquee/slide2.jpg" alt="" />
            </div>
          </div>
          <div className="embla__slide">
            <div className='grid justify-center'>
            <img className=' text-center' src="/marquee/slide3.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="/banner2.png" alt="" />
      </div>
      <div>
        <img src="/banner1.png" alt="" />
      </div>
      <div>
        <img src="/banner3.png" alt="" />
      </div>
      <div>
        <img src="/banner4.png" alt="" />
      </div>
      <div>
        <img src="/banner5.png" alt="" />
      </div>
      <div>
        <img src="/banner6.png" alt="" />
      </div>
    </div>
  )
}
