import { CollectionConfig } from 'payload/types';

const ThreeDObject_zip: CollectionConfig = {
  slug: 'threeDObject_zip',
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

export default ThreeDObject_zip;
