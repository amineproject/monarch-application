import { CollectionConfig } from 'payload/types';

const Images: CollectionConfig = {
  slug: 'images',
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  access: {
    read: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  upload: {
    staticURL: 'https://monarch-application.s3.eu-west-3.amazonaws.com',
  },
  labels: {
    singular: 'Product Image',
    plural: 'Product Images ',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      admin: {
        condition: () => false,
      },
      hasMany: true,
      required: true,
    },
  ],
};

export default Images;
