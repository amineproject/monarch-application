export const PRODUCT_CATEGORIES = [
    {
        label: "Vêtements ",
        value: "icons" as const,
        featured: [
            {
                name: "Magasin Virtuel",
                href: "/magasinVirtuel",
                imageSrc: "/nav/icons/mannequin-femme.jpg"
            },
            {
                name: "Monarch pour Monsieur",
                href: "/magasin/Homme",
                imageSrc: "/nav/icons/mannequin.jpg"
            },
            {
                name: "Monarch pour Madame",
                href: "/magasin/Femme",
                imageSrc: "/nav/icons/mannequin2.jpg"
            }
        ]
    },
    {
        label: "Collections",
        value: "ui_kits" as const,
        featured: [
            {
                name: "Editor picks",
                href: "#",
                imageSrc: "/nav/ui-kits/mixed.jpg"
            },
            {
                name: "New Arrivals",
                href: "#",
                imageSrc: "/nav/ui-kits/blue.jpg"
            },
            {
                name: "Best Sellers",
                href: "#",
                imageSrc: "/nav/ui-kits/purple.jpg"
            }
        ]
    },
    {
        label: "Exclusivité",
        value: "Exclusivité" as const,
        featured:[]
    },
]