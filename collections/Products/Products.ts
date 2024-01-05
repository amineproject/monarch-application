import { PRODUCT_CATEGORIES } from "../../src/config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {

    },
    fields:[
        {
            name: "user", //Chaque produit est lié à un utilisateur
            type: "relationship",
            relationTo: "users", //ça veut dire que la collection products est lié aux users.
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            label: "Product details",
        },
        {
            name: "price",
            label: "Price in USD",
            min: 0,
            max: 20000,
            type: "number",
            required: true
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(
                ({label, value}) => ({label, value})
            ),
            required: true
        },
        {
            name: "forWho",
            label: "Sexe",
            type: "select",
            options: ["Femme", "Homme", "Mixte"],
            required: true
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({req}) => req.user.role === "admin",
                read: ({req}) => req.user.role === "admin",
                update: ({req}) => req.user.role === "admin"
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending"
                },
                {
                    label: "Approved",
                    value: "approved"
                },
                {
                    label: "Denied",
                    value: "Denied"
                }
            ],
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false 
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false 
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "product_files",
            label: "Product file(s)",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false
        }, 
        {
            name: "Product_3D_GLTF",
            label: "Product 3D (GLTF)",
            type: "relationship",
            required: true,
            relationTo: "threeDObject_gltf",
            hasMany: false,
        }, 
        {
            name: "Product_3D_BIN",
            label: "Product 3D (BIN)",
            type: "relationship",
            required: true,
            relationTo: "threeDObject_bin"
        }, 
        {
            name: "product_3D_File_textures",
            label: "Product 3D (Textures)",
            type: "relationship",
            required: true,
            hasMany: true,
            relationTo: "threeDObject_textures"
        }, 
        {
            name: "images",
            label: "Product Images",
            type: "relationship",
            required: true,
            relationTo: "images",
            hasMany: true
        },      
        {
            name: "threeDObject_zip",
            label: "3D Compressed Files",
            type: "relationship",
            required: true,
            relationTo: "threeDObject_zip", 
        }
    ]
}