import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { Users } from '../collections/Users'
import dotenv from 'dotenv'
import { Products } from '../collections/Products/Products'

import { Media } from '../collections/Media'
import { ProductFiles } from '../collections/ProductFile'
import { Orders } from '../collections/Orders'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import ThreeDObject_gltf from '../collections/threeDObject_gltf'
import ThreeDObject_bin from '../collections/threeDObject_bin'
import ThreeDObject_textures from '../collections/threeDObject_textures'
import Images from '../collections/Images'
import ThreeDObject_zip from '../collections/threeDObject_zip'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

//npm install @payloadcms/plugin-cloud-storage @aws-sdk/client-s3 @aws-sdk/lib-storage


const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: "AKIAYUNSFUBHEQRKZ34M",
      secretAccessKey: "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",
    },
  },
  bucket: "monarch-application",
})


const storageAdapterForTextures = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    
    credentials: {
      accessKeyId: "AKIAYUNSFUBHEQRKZ34M",
      secretAccessKey: "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",
    },
  },
  bucket: "monarch-application",
})


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media, ProductFiles, Orders, ThreeDObject_gltf, ThreeDObject_bin, ThreeDObject_textures, Images, ThreeDObject_zip], 
  routes: {
    admin: '/sell',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- DigitalHippo',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true
  },

  plugins: [
    cloudStorage({
      collections: {
        "threeDObject_gltf": {
          adapter: storageAdapter,
        },
        "threeDObject_bin": {
          adapter: storageAdapter,
        },
        "threeDObject_textures": {
          adapter: storageAdapterForTextures,
          prefix: "textures/"
        },
        "images": {
          adapter: storageAdapterForTextures,
          prefix: "images/"
        }
      }
    })
  ]
})