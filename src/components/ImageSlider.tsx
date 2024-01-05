"use client"

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
  urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(
    null
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      })
    })
  }, [swiper, urls])
  console.log("URLS", urls)

  const modifiedUrls = urls.map((urlObj: any) => {
    // Vérification pour s'assurer que l'objet a une propriété 'filename'
    if (urlObj && urlObj.filename && urlObj.prefix) {
      return `https://monarch-application.s3.eu-west-3.amazonaws.com/${urlObj.prefix}${urlObj.filename}`;
    } else {
      // Gérer le cas où l'objet ne possède pas les propriétés nécessaires ou d'autres cas d'erreur
      return null; // Ou une autre valeur par défaut selon ton besoin
    }
  }).filter(url => url !== null); // Pour filtrer les éventuelles valeurs null dans le tableau
  
  // Maintenant, modifiedUrls contiendra un tableau d'URLs complètes avec le préfixe "images/"
  
  
  console.log("modifiedUrls", modifiedUrls)



  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'

  return (
    <div className='group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl'>
      <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(
            activeStyles,
            'right-3 transition',
            {
              [inactiveStyles]: slideConfig.isEnd,
              'hover:bg-primary-300 text-primary-800 opacity-100':
                !slideConfig.isEnd,
            }
          )}
          aria-label='next image'>
          <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isBeginning,
          })}
          aria-label='previous image'>
          <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
        className='h-full w-full'>
        {modifiedUrls.filter(url => url !== null).map((modifiedUrl, i) => (
        <SwiperSlide key={i} className='-z-10 relative h-full w-full'>
          <Image
            fill
            loading='eager'
            className='-z-10 h-full w-full object-cover object-center'
            src={modifiedUrl} // Utilisation de modifiedUrl au lieu de url
            alt='Product image'
          />
        </SwiperSlide>
      ))}

      </Swiper>
    </div>
  )
}

export default ImageSlider