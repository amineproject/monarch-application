"use client"

import { Button } from "@/components/ui/button"
import { PRODUCT_CATEGORIES } from "@/config"
import { useCart } from "@/hooks/use-card"
import { cn, formatPrice } from "@/lib/utils"
import { Check, Divide, Link, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {

    const { items, removeItem } = useCart()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        setIsMounted(true)
    }, []) 

    return(
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xlk font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Paiement
                </h1>

                <div className="mt-12 lg:grid lg:grid-cols-&é lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <div className={
                        cn("lg:col-span-7", {
                        "rounded-lg border-2 border-dashed border-zinc-200 p-12" : isMounted && items.length === 0 ,
}                       )}>
                        <h2 className="sr-only">Produits</h2>

                        {isMounted && items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-1">
                                <div arria-hidden="true" className="relative mb-4 h-40 w-40 text-muted-foreground">
                                    <Image src="/hippo-empty-cart.png" fill loading="eager" alt="Panier vide"/>
                                    <h3 className="font-semibold text-2xl">
                                        Panier vide
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Go shop !
                                    </p>
                                </div>
                            </div>
                        ) : null}

                     <ul
                        className={cn({
                            'divide-y divide-gray-200 border-b border-t border-gray-200':
                            isMounted && items.length > 0,
                        })}>
                        {isMounted &&
                            items.map(({ product }) => {
                            const label = PRODUCT_CATEGORIES.find(
                                (c) => c.value === product.category
                            )?.label

                        const modifiedUrls = product.images.map((urlObj: any) => {
                            // Vérification pour s'assurer que l'objet a une propriété 'filename'
                            if (urlObj && urlObj.filename && urlObj.prefix) {
                              return `https://monarch-application.s3.eu-west-3.amazonaws.com/${urlObj.prefix}${urlObj.filename}`;
                            } else {
                              // Gérer le cas où l'objet ne possède pas les propriétés nécessaires ou d'autres cas d'erreur
                              return null; // Ou une autre valeur par défaut selon ton besoin
                            }
                          }).filter(url => url !== null); // Pour filtrer les éventuelles valeurs null dans le tableau
                          const imageUrl1 = modifiedUrls[0]

                          return (
                            <li
                            key={product.id}
                            className='flex py-6 sm:py-10'>
                            <div className='flex-shrink-0'>
                                <div className='relative h-24 w-24'>
                                { imageUrl1 ? (
                                    <Image
                                    fill
                                    src={imageUrl1}
                                    alt='product image'
                                    className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                                    />
                                ) : null}
                                </div>
                            </div>

                            <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                <div>
                                    <div className='flex justify-between'>
                                    <h3 className='text-sm'>
                                        <Link
                                        href={`/product/${product.id}`}
                                        className='font-medium text-gray-700 hover:text-gray-800'>
                                        {product.name}
                                        </Link>
                                    </h3>
                                    </div>

                                    <div className='mt-1 flex text-sm'>
                                    <p className='text-muted-foreground'>
                                        Category: {label}
                                    </p>
                                    </div>

                                    <p className='mt-1 text-sm font-medium text-gray-900'>
                                    {formatPrice(product.price)}
                                    </p>
                                </div>

                                <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                    <div className='absolute right-0 top-0'>
                                    <Button
                                        aria-label='remove product'
                                        onClick={() =>
                                        removeItem(product.id)
                                        }
                                        variant='ghost'>
                                        <X
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                        />
                                    </Button>
                                    </div>
                                </div>
                                </div>

                                <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                                <Check className='h-5 w-5 flex-shrink-0 text-green-500' />

                                <span>
                                    Disponible
                                </span>
                                </p>
                            </div>
                            </li>
                        )
                        })}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )   
}
export default Page