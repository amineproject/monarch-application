import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'


interface PageProps {
    params: {
        forWho: string
      }
}

const Page = async ( { params }: PageProps) => {

    const { forWho } = params
  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      id: {
        equals: forWho || "Mixte",
      },
    },
  })
 
  console.log("forWho", forWho)

  if (!products) return notFound()


  return (
    <MaxWidthWrapper className='bg-white'>
        <div className='border border-red-600 rounded-xl'>
            <h1>Bonjour, collection pour {forWho}</h1>
        </div>
    </MaxWidthWrapper>
  )
}

export default Page