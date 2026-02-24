# CMS Integration Contract

Configure these environment variables in `.env`:

- `VITE_CMS_CATALOG_URL`
- `VITE_CMS_NEW_RELEASES_URL`
- `VITE_CMS_DISTRO_URL`
- `VITE_CMS_DISTRO_UPDATES_URL`
- `VITE_CMS_MERCH_URL`
- `VITE_CMS_AUTH_TOKEN` (optional bearer token)

Sanity managed mode (recommended):

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET` (usually `production`)
- `VITE_SANITY_API_VERSION` (example `2025-01-01`)
- `VITE_SANITY_READ_TOKEN` (optional, needed for private datasets)
- `VITE_SANITY_CATALOG_QUERY` (optional override)
- `VITE_SANITY_NEW_RELEASES_QUERY` (optional override)
- `VITE_SANITY_DISTRO_QUERY` (optional override)
- `VITE_SANITY_DISTRO_UPDATES_QUERY` (optional override)
- `VITE_SANITY_MERCH_QUERY` (optional override)

Each URL should return a JSON array, or an object with `items` array, or a Strapi-style `data` array.
If Sanity env vars are present, Sanity is used first and URL endpoints are ignored.

## Sanity default document types

- `catalogRelease`
- `newRelease`
- `distroItem`
- `distroUpdate`
- `merchItem`

Default queries already map image assets to `"imageUrl": image.asset->url`.

## Catalog item shape

```json
{
  "id": "fatal-exposure-bikini-atoll-broadcast",
  "artist": "FATAL EXPOSURE",
  "title": "Bikini Atoll Broadcast",
  "formats": ["cd"],
  "price": 12,
  "image": "/fatal exposure capa.jpg",
  "genre": "Thrash",
  "year": 2026,
  "description": "Contamination-themed thrash assault.",
  "details": ["Official Selvajaria pressing"],
  "trackHighlights": ["False Circuit"],
  "listeningUrl": "https://selvajariarecords.bandcamp.com/",
  "inStock": true,
  "countries": ["portugal"],
  "isLatest": true
}
```

## New releases item shape (Hero)

```json
{
  "artist": "FATAL EXPOSURE",
  "title": "BIKINI ATOLL BROADCAST",
  "image": "/fatal exposure capa.jpg",
  "line": "FULL CONTAMINATION ALERT! CD OUT NOW!"
}
```

## Distro item shape

```json
{
  "id": "deathlike-stab-knife-murders",
  "name": "Knife Murders",
  "artist": "Deathlike Stab",
  "image": "/deathlike capa.jpg",
  "format": "CD",
  "price": 12,
  "listeningUrl": "https://selvajariarecords.bandcamp.com/",
  "genre": "death",
  "country": "brazil",
  "inStock": true
}
```

## Distro updates item shape

```json
{
  "id": "distro-update-feb",
  "title": "February distro restock",
  "date": "2026-02-10",
  "excerpt": "Selected titles are back in stock.",
  "href": "https://example.com/news/feb-restock"
}
```

## Merch item shape

```json
{
  "id": "selvajaria-hoodie",
  "name": "Selvajaria Hoodie",
  "image": "/hoodie.jpg",
  "price": 25,
  "description": "Heavyweight hoodie with Selvajaria print.",
  "details": ["Unisex fit", "Front print", "Soft brushed interior"]
}
```
