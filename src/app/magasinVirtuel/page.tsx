import { App } from '@/components/App'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPayloadClient } from '@/get-payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'


interface PageProps {
    params: {
        forWho: string
      }
}

const Page = async () => {

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
  })
 
  if (!products) return notFound()

  const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
    { id: 3, name: `${products[0].name}`, href: `${products[0].id}` },
    { id: 4, name: 'Lab', href: '/laboratoire' }
  ]



  return (
    <div>
        <div
         className='pathMonarchLab text-white text-5xl z-11'>
          <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-lg'>
                    <Link
                      href={breadcrumb.href}
                      className='font-semibold text-sm  hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
      </div>
      <div className='virtualMagasin h-screen w-screen z-10'>
               <App />
      </div>
</ div>
  )
}

export default Page