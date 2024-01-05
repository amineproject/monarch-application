import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '../hooks/use-card'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

const CartItem = ({ product }: { product: Product }) => {
  console.log("product", product)
  const modifiedUrls = product.images.map((urlObj: any) => {
    // Vérification pour s'assurer que l'objet a une propriété 'filename'
    if (urlObj && urlObj.filename && urlObj.prefix) {
      return `https://monarch-application.s3.eu-west-3.amazonaws.com/${urlObj.prefix}${urlObj.filename}`;
    } else {
      // Gérer le cas où l'objet ne possède pas les propriétés nécessaires ou d'autres cas d'erreur
      return null; // Ou une autre valeur par défaut selon ton besoin
    }
  }).filter(url => url !== null); // Pour filtrer les éventuelles valeurs null dans le tableau
  
  console.log("modifiedUrls", modifiedUrls)

  const image = modifiedUrls[0]
  const { removeItem } = useCart()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className='absolute object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center bg-secondary'>
                <ImageIcon
                  aria-hidden='true'
                  className='h-4 w-4 text-muted-foreground'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col self-start'>
            <span className='line-clamp-1 text-sm font-medium mb-1'>
              {product.name}
            </span>

            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              {label}
            </span>

            <div className='mt-4 text-xs text-muted-foreground'>
              <button
                onClick={() => removeItem(product.id)}
                className='flex items-center gap-0.5'>
                <X className='w-3 h-4' />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col space-y-1 font-medium'>
          <span className='ml-auto line-clamp-1 text-sm'>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem