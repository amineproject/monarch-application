import { CollectionConfig } from 'payload/types';

const ThreeDObject_gltf: CollectionConfig = {
  slug: 'threeDObject_gltf',
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
    singular: '3D Product GLTF File',
    plural: '3D Product GLTF Files',
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
    {
      name: 'threeDObject_bin',
      type: 'relationship',
      relationTo: 'threeDObject_bin',
      admin: {
        condition: () => false,
      },
      required: true,
    },
  ],
};

export default ThreeDObject_gltf;
