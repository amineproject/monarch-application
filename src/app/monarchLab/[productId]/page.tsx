import { getPayloadClient } from '@/get-payload'
import MonarchLab from "../../../../public/MonarchLab"
import Configurator from '../../../../public/Configurator'
import "../../globals.css";
import Link from 'next/link';


interface PageProps {
    params: {
      productId: string;
      product_files_3D: string[];
    }
  }
  






const Page = async ({ params }: PageProps) => {
    const { productId, product_files_3D } = params;
      let monarchLaboProps = {};

  const payload = await getPayloadClient()
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  });
  
  if (products.length > 0) {
    const product = products[0];
    const GLTF_file = product.Product_3D_GLTF
    const BIN_file = product.Product_3D_BIN
    const Texture_file = product.product_3D_File_textures
    const ZIP_3D = product.threeDObject_zip

    console.log("page.tsx -> Monarchlab/productId ---> product.Product_3D_GLTF", GLTF_file)
    console.log("page.tsx -> Monarchlab/productId ---> product.Product_3D_BIN", BIN_file)
    console.log("page.tsx -> Monarchlab/productId ---> product.product_3D_File_textures", Texture_file)
    console.log("product", products)
    
    monarchLaboProps = {
        productId,
        GLTF_file,
        BIN_file, // Ajoutez ici les données à transmettre à MonarchLabo
        Texture_file,
        ZIP_3D,
      };

    } else {
      console.log('Aucun fichier 3D trouvé pour ce produit.');
    } 


    const BREADCRUMBS = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: 'Products', href: '/products' },
        { id: 3, name: `${products[0].name}`, href: `${products[0].id}` },
        { id: 4, name: 'Lab', href: '/laboratoire' }
      ]
    
  
  return (
    
    <div>
        <div className='pathMonarchLab text-white text-5xl  z-10'>
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
        <MonarchLab monarchLaboProps={monarchLaboProps}  />
    </ div>
    
  )
}

export default Page