"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import '../../src/app/fonts.css'
import { Truck , CheckCircle,  Leaf } from 'lucide-react'
import illustration1 from "../components/assets/illustration6.png";
import illustration2 from "../components/assets/illustration4.png";
import illustration3 from "../components/assets/illustration5.png";
import MonarchLogo from "../components/assets/Monarch.png"
import { ComputersCanvas, MonarchPourDeux, MonarchPourMonsieur} from "../components/Canvas/index.jsx"
import ImageGenerator from '@/components/openai/generativeIA';
import { motion, AnimatePresence } from 'framer-motion';
import ProductReel from '@/components/ProductReel'
const perks = [
  {
    name: 'Livraison rapide',
    Icon: Truck ,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Paiement sécurisé',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'Ecologique',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

const variants = {
    hidden: { opacity: 0},
    show: {
      opacity: 3,
    transition: {
      staggerChildren: 0.2
      },  
    },
}


export default function Home() {
  return (
    <>
      
       <MaxWidthWrapper>
        <motion.div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'
           initial={{ opacity: 0, z: 15}}
           animate={{ opacity: 1, z: 0}}
           exit={{opacity: 0, z: 15}}
           transition={{ delay: 0.90}}>
          <AnimatePresence>
            <motion.div 
            className="lg:mr-20 sm:mr-0"
            >
                <img  src={MonarchLogo.src} className='h-20  mx-0' alt="Generated Image" />
            </motion.div>
          </AnimatePresence>
          <h1 className='text-4xl mt-10 font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Haute couture, Paris{' '}
            <span className='font-relington text-red-950'>
              Monarch luxury
            </span>
            .
          </h1>
          <p className='mt-6  text-lg max-w-prose text-muted-foreground'>
          L'élégance est une promesse tenue à chaque couture.
          Chaque vêtement incarne l'essence du luxe.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <a
              href='/products'
              className={buttonVariants()}>
              Voir nos collections
            </a>
            <Button variant='outline'>
              Haute couture &rarr;
            </Button>
          </div>
        </motion.div>
      
    </MaxWidthWrapper>

    <motion.section className='border-gray-200 bg-gradient-to-r from-white to-slate-100'
        initial={{ opacity: 0, z: 15}}
        animate={{ opacity: 1, z: 0}}
        exit={{opacity: 3, z: 15}}
        transition={{ delay: 0.4}}
    >
        <MaxWidthWrapper className='py-20'>
        <motion.h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'
          initial={{ opacity: 0, z: 15}}
          animate={{ opacity: 1, z: 0}}
          exit={{opacity: 0, z: 15}}
          transition={{ delay: 0.90}}>{' '}
            <motion.span className='font-relington text-red-950'
            >
              Devise
            </motion.span>
            .
          </motion.h1>
        <div className="lg:flex">
          <motion.div className=" p-6"
            variants={variants}
            initial= "hidden"
            animate= "show"
          >
            <ImageGenerator imageUrl={illustration1.src} /> 
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 text-center'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    Elegance
                  </h3>
                  <p className='mt-2 text-black text-sm'>
                    La vie est une œuvre d'art, et chaque geste, chaque vêtement, sont des pinceaux qui contribuent à créer la toile élégante de notre existence.  <br />          
                      <span className='font-relington text-red-950'>
                        Comtesse de Saint-Exupéry
                      </span>
                     .
                  </p>
            </div>
          </motion.div>

          <motion.div className="  p-6"
               variants={variants}
               initial= "hidden"
               animate= "show"
          >
            <ImageGenerator imageUrl={illustration2.src}  />
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 text-center'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    Beauté
                  </h3>
                  <p className='mt-2 text-black text-sm '>
                  La beauté plaît aux yeux, mais la douceur charme l'âme  <br />          
                      <span className='font-relington text-red-950'>
                        Voltaire
                      </span>
                     .
                  </p>
            </div>
          </motion.div>

          <motion.div className="  p-6"
          variants={variants}
          initial= "hidden"
          animate= "show"
          >
            <ImageGenerator imageUrl={illustration3.src}  />
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 text-center'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    Charme
                  </h3>
                  <p className='mt-2 text-sm text-black'>
                   Le charme d'un monarque réside dans la grâce de ses gestes, illuminant la cour de Versailles de son éclat royal     <br />     
                      <span className='font-relington text-red-950'>
                      Louis XIV
                      </span>
                     .
                  </p>
            </div>
          </motion.div>
        </div>


        <div className="lg:flex mt-16 custom-height-women-bag">
          <motion.section className={`IndexUp content-end relative w-full h-screen mx-auto`}
            initial={{ opacity: 0, z: 25}}
            animate={{ opacity: 1, z: 0}}
            exit={{opacity: 0, z: 25}}
            transition={{ delay: 2}}>
            <ComputersCanvas />
          </motion.section>
          <div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              <span className='font-relington text-red-950'>
                Monarch pour madame
              </span>
              .
            </h1>
            <p className='mt-2 text-sm '>
              Style sans effort, choix infini. Découvrez une collection élégante et variée pour exprimer votre singularité. Magasinez avec style, magasinez avec nous.
            </p>
            <div className='flex items-center justify-center py-20'>
              <a href='/products' className={buttonVariants()}>
                Collections Femme
              </a>
            </div>

          </div>
</div>

                
<div className="lg:flex custom-height-women-bag ">
  <div >
  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>{' '}
        <span className='font-relington text-red-950'>
          Monarch pour monsieur
        </span>
        .
    </h1>
    <p className='mt-2 text-sm '>
    Explorez l'élégance à chaque coin. Choisissez parmi une gamme étendue de pièces raffinées, et adoptez un style qui vous ressemble. Parcourez notre collection avec assurance et trouvez votre expression de la mode.
    </p>
    <div className='flex items-center justify-center py-20'>
      <a href='/products' className={buttonVariants()}>
        Collections Homme
      </a>
    </div>
  </div>
    <motion.section className={`IndexUp content-end relative w-full h-screen mx-auto`}
            initial={{ opacity: 0, z: 25}}
            animate={{ opacity: 1, z: 0}}
            exit={{opacity: 0, z: 25}}
            transition={{ delay: 2}}>
            <MonarchPourMonsieur/>
          </motion.section>
</div>


<ProductReel query={{sort: "desc", limit: 4}} title="Quick view" href='/products'/>
          <div className=' mt-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </motion.section>
    </>
  )
}
 