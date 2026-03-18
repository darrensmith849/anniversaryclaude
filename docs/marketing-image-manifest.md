# Marketing Image Manifest

All images are sourced from Unsplash under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required).

## Homepage (`/public/images/home/`)

| File | Subject | Unsplash CDN ID | Photographer | Dimensions | Size |
|------|---------|-----------------|-------------|------------|------|
| `home-hero-cape-town.jpg` | Aerial Cape Town with Table Mountain & coastline | `photo-1516426122078-c23e76b48f62` | Josh Hild | 1920x1280 | 504K |
| `home-cta-winelands.jpg` | Wine glass with vineyard rows in background | `photo-1506377247377-2a5b3b417ebb` | Kym Ellis | 1920x1280 | 222K |
| `home-collection-safari.jpg` | Safari vehicle in tall grass at sunset, acacia trees | `photo-1547471080-7cc2caa01a7e` | Hu Chen | 1200x802 | 138K |

## Collection Heroes (`/public/images/collections/`)

| File | Subject | Unsplash CDN ID | Photographer | Dimensions | Size |
|------|---------|-----------------|-------------|------------|------|
| `safari-hero.jpg` | African savanna sunset, lone acacia silhouette | `photo-1523805009345-7448845a9e53` | Damian Patkowski | 1920x1280 | 450K |
| `winelands-hero.jpg` | Stellenbosch hillside with fynbos, mountains in mist | `photo-1553783075-906930b08f36` | Mpho Mojapelo | 1920x1165 | 449K |
| `coastal-luxury-hero.jpg` | Beach sunset, turquoise water, gentle waves | `photo-1507525428034-b723cf961d3e` | Sean Oulashin | 1920x1276 | 308K |
| `city-hero.jpg` | Johannesburg skyline with Hillbrow Tower | `photo-1577948000111-9c970dfe3743` | Clodagh Da Paixao | 1920x1440 | 760K |
| `adventure-romance-hero.jpg` | Drakensberg Amphitheatre, green valleys, sandstone cliffs | `photo-1609521487462-d7712d987a02` | Spekboom | 1920x1440 | 511K |

## Image Specs

- **Format:** JPEG (progressive)
- **Max width:** 1920px
- **Quality:** 75–80 (Unsplash CDN `q` parameter)
- **Delivery:** Next.js `<Image>` component auto-optimizes to WebP/AVIF at request time
- **Fallback:** Each slot has a matching CSS gradient in `HeroImage` component

## Path Conventions

```
/public/images/home/       → Homepage-specific images
/public/images/collections/ → Collection hero images
```

Collection hero filenames follow the pattern: `{slug}-hero.jpg` where `slug` matches the URL path segment (e.g., `safari`, `winelands`, `coastal-luxury`, `city`, `adventure-romance`).
