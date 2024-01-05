import { Access, CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: { 
      generateEmailHTML: ({token}) => {
        return `<a href=${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}>Vérifiez votre mail.</a>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'role',
      defaultValue: "users",
   
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
}