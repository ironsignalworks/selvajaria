import { useEffect, useMemo, useState } from 'react';
import { releases, type Release } from '../components/ReleaseGrid';
import { distroItems, merchItems, type DistroItem, type DistroUpdate, type MerchItem } from '../components/SubpageContent';
import type { HeroRelease } from '../components/Hero';
import catalogSeed from '../../../docs/import/catalog-release-seed.json';

interface CmsContentState {
  catalogReleases: Release[];
  featuredReleases: HeroRelease[];
  distroItems: DistroItem[];
  distroUpdates: DistroUpdate[];
  merchItems: MerchItem[];
  cmsEnabled: boolean;
  cmsError: string | null;
}

const CMS_CATALOG_URL = import.meta.env.VITE_CMS_CATALOG_URL as string | undefined;
const CMS_NEW_RELEASES_URL = import.meta.env.VITE_CMS_NEW_RELEASES_URL as string | undefined;
const CMS_DISTRO_URL = import.meta.env.VITE_CMS_DISTRO_URL as string | undefined;
const CMS_DISTRO_UPDATES_URL = import.meta.env.VITE_CMS_DISTRO_UPDATES_URL as string | undefined;
const CMS_MERCH_URL = import.meta.env.VITE_CMS_MERCH_URL as string | undefined;
const CMS_AUTH_TOKEN = import.meta.env.VITE_CMS_AUTH_TOKEN as string | undefined;
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET as string | undefined;
const SANITY_API_VERSION = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? '2025-01-01';
const SANITY_READ_TOKEN = import.meta.env.VITE_SANITY_READ_TOKEN as string | undefined;
const SANITY_CATALOG_QUERY = import.meta.env.VITE_SANITY_CATALOG_QUERY as string | undefined;
const SANITY_NEW_RELEASES_QUERY = import.meta.env.VITE_SANITY_NEW_RELEASES_QUERY as string | undefined;
const SANITY_DISTRO_QUERY = import.meta.env.VITE_SANITY_DISTRO_QUERY as string | undefined;
const SANITY_DISTRO_UPDATES_QUERY = import.meta.env.VITE_SANITY_DISTRO_UPDATES_QUERY as string | undefined;
const SANITY_MERCH_QUERY = import.meta.env.VITE_SANITY_MERCH_QUERY as string | undefined;

const DEFAULT_SANITY_CATALOG_QUERY = `*[_type == "catalogRelease"] | order(year desc, _createdAt desc) {
  "id": coalesce(slug.current, _id),
  artist,
  title,
  formats,
  price,
  "imageUrl": image.asset->url,
  genre,
  year,
  description,
  details,
  trackHighlights,
  listeningUrl,
  inStock,
  countries,
  isLatest
}`;
const DEFAULT_SANITY_NEW_RELEASES_QUERY = `*[_type == "newRelease"] | order(priority asc, _createdAt desc) {
  artist,
  title,
  line,
  "imageUrl": image.asset->url
}`;
const DEFAULT_SANITY_DISTRO_QUERY = `*[_type == "distroItem"] | order(_createdAt desc) {
  "id": coalesce(slug.current, _id),
  name,
  artist,
  "imageUrl": image.asset->url,
  format,
  price,
  listeningUrl,
  genre,
  country,
  inStock
}`;
const DEFAULT_SANITY_DISTRO_UPDATES_QUERY = `*[_type == "distroUpdate"] | order(date desc, _createdAt desc) {
  "id": coalesce(slug.current, _id),
  title,
  date,
  excerpt,
  href
}`;
const DEFAULT_SANITY_MERCH_QUERY = `*[_type == "merchItem"] | order(_createdAt desc) {
  "id": coalesce(slug.current, _id),
  name,
  "imageUrl": image.asset->url,
  price,
  description,
  details
}`;

const withLeadingSlash = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

const toHeroLine = (release: Pick<Release, 'description' | 'formats'>) => {
  const description = release.description?.trim();
  if (description) {
    return description;
  }
  return `${release.formats[0]?.toUpperCase() ?? 'FORMAT'} OUT NOW!`;
};

const fallbackFeaturedReleases: HeroRelease[] = releases.slice(0, 3).map((release) => ({
  artist: release.artist,
  title: release.title.toUpperCase(),
  image: withLeadingSlash(release.image),
  line: toHeroLine(release),
}));

interface SeedCatalogItem {
  id?: string;
  artist?: string;
  title?: string;
  formats?: string[];
  price?: number;
  image?: string;
  genre?: string;
  year?: number;
  releaseDate?: string;
  description?: string;
  details?: string[];
  trackHighlights?: string[];
  listeningUrl?: string;
  inStock?: boolean;
  countries?: string[];
  isLatest?: boolean;
}

const getReleaseTimestamp = (release: Release) => {
  if (release.releaseDate) {
    const timestamp = Date.parse(release.releaseDate);
    if (Number.isFinite(timestamp)) {
      return timestamp;
    }
  }
  return Date.UTC(release.year, 0, 1);
};

const seededCatalogReleases: Release[] = (catalogSeed as SeedCatalogItem[])
  .map((item, index) => {
    const artist = item.artist?.trim();
    const title = item.title?.trim();
    if (!artist || !title) {
      return null;
    }
    const normalizedFormats = Array.isArray(item.formats)
      ? item.formats.filter(
          (format): format is Release['formats'][number] =>
            format === 'vinyl' || format === 'cd' || format === 'tape' || format === 'digital'
        )
      : [];

    return {
      id: item.id ?? `seed-release-${index + 1}`,
      artist,
      title,
      formats: normalizedFormats.length > 0 ? normalizedFormats : ['cd'],
      price: typeof item.price === 'number' ? item.price : 12,
      image: withLeadingSlash(item.image ?? '/logo3.png'),
      genre: item.genre ?? 'Unknown',
      year: typeof item.year === 'number' ? item.year : new Date().getFullYear(),
      releaseDate: typeof item.releaseDate === 'string' ? item.releaseDate : undefined,
      description: item.description ?? '',
      details: Array.isArray(item.details) ? item.details : [],
      trackHighlights: Array.isArray(item.trackHighlights) ? item.trackHighlights : [],
      listeningUrl: item.listeningUrl,
      inStock: typeof item.inStock === 'boolean' ? item.inStock : true,
      countries: Array.isArray(item.countries) ? item.countries : [],
      isLatest: typeof item.isLatest === 'boolean' ? item.isLatest : false,
    };
  })
  .filter((item): item is Release => item !== null)
  .sort((a, b) => getReleaseTimestamp(b) - getReleaseTimestamp(a));

const seededDistroItems: DistroItem[] = seededCatalogReleases.map((release) => ({
  id: String(release.id),
  name: release.title,
  artist: release.artist,
  image: release.image,
  format: release.formats[0]?.toUpperCase() ?? 'CD',
  price: release.price,
  listeningUrl: release.listeningUrl,
  genre: release.genre.toLowerCase(),
  country: release.countries?.[0] ?? '',
  inStock: release.inStock ?? true,
}));

const fallbackCatalogReleases = seededCatalogReleases.length > 0 ? seededCatalogReleases : releases;
const fallbackDistroItems = seededDistroItems.length > 0 ? seededDistroItems : distroItems;
const fallbackSeededFeaturedReleases: HeroRelease[] = fallbackCatalogReleases.slice(0, 3).map((release) => ({
  artist: release.artist,
  title: release.title.toUpperCase(),
  image: withLeadingSlash(release.image),
  line: toHeroLine(release),
}));

const fallbackState: CmsContentState = {
  catalogReleases: fallbackCatalogReleases,
  featuredReleases: fallbackSeededFeaturedReleases.length > 0 ? fallbackSeededFeaturedReleases : fallbackFeaturedReleases,
  distroItems: fallbackDistroItems,
  distroUpdates: [],
  merchItems,
  cmsEnabled: false,
  cmsError: null,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const readString = (value: Record<string, unknown>, keys: string[], fallback = '') => {
  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return fallback;
};

const readNumber = (value: Record<string, unknown>, keys: string[], fallback = 0) => {
  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === 'number' && Number.isFinite(candidate)) {
      return candidate;
    }
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      const parsed = Number(candidate);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return fallback;
};

const readBoolean = (value: Record<string, unknown>, keys: string[], fallback = false) => {
  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === 'boolean') {
      return candidate;
    }
  }
  return fallback;
};

const readStringArray = (value: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const candidate = value[key];
    if (Array.isArray(candidate)) {
      return candidate.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    }
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [] as string[];
};

const unwrapArray = (value: unknown): Record<string, unknown>[] => {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }
  if (!isRecord(value)) {
    return [];
  }
  if (Array.isArray(value.items)) {
    return value.items.filter(isRecord);
  }
  if (Array.isArray(value.data)) {
    return value.data.filter(isRecord).map((item) => {
      if (isRecord(item.attributes)) {
        return { ...item.attributes, id: item.id ?? item.attributes.id };
      }
      return item;
    });
  }
  return [];
};

const toFormat = (value: string): Release['formats'][number] | null => {
  const normalized = value.toLowerCase();
  if (normalized === 'vinyl' || normalized === 'cd' || normalized === 'tape' || normalized === 'digital') {
    return normalized;
  }
  if (normalized === 'lp') {
    return 'vinyl';
  }
  if (normalized === 'cassette') {
    return 'tape';
  }
  return null;
};

const mapRelease = (item: Record<string, unknown>, index: number): Release | null => {
  const artist = readString(item, ['artist']);
  const title = readString(item, ['title', 'name']);
  const image = readString(item, ['image', 'imageUrl', 'cover', 'coverImage'], '/logo3.png');
  if (!artist || !title) {
    return null;
  }

  const formats = readStringArray(item, ['formats', 'format'])
    .map(toFormat)
    .filter((format): format is Release['formats'][number] => format !== null);

  return {
    id: readString(item, ['id', 'slug'], `cms-release-${index}`),
    artist,
    title,
    formats: formats.length > 0 ? formats : ['cd'],
    price: readNumber(item, ['price'], 12),
    image: withLeadingSlash(image),
    genre: readString(item, ['genre'], 'Unknown'),
    year: readNumber(item, ['year'], new Date().getFullYear()),
    releaseDate: readString(item, ['releaseDate', 'date', 'releasedAt']),
    description: readString(item, ['description'], ''),
    details: readStringArray(item, ['details']),
    trackHighlights: readStringArray(item, ['trackHighlights', 'tracks']),
    listeningUrl: readString(item, ['listeningUrl', 'listenUrl', 'url']),
    inStock: readBoolean(item, ['inStock'], true),
    countries: readStringArray(item, ['countries', 'country']),
    isLatest: readBoolean(item, ['isLatest'], false),
  };
};

const mapDistroItem = (item: Record<string, unknown>, index: number): DistroItem | null => {
  const artist = readString(item, ['artist']);
  const name = readString(item, ['name', 'title']);
  const image = readString(item, ['image', 'imageUrl', 'cover'], '/logo3.png');
  if (!artist || !name) {
    return null;
  }
  return {
    id: readString(item, ['id', 'slug'], `cms-distro-${index}`),
    name,
    artist,
    image: withLeadingSlash(image),
    format: readString(item, ['format'], 'CD'),
    price: readNumber(item, ['price'], 12),
    listeningUrl: readString(item, ['listeningUrl', 'listenUrl', 'url']),
    genre: readString(item, ['genre']),
    country: readString(item, ['country']),
    inStock: readBoolean(item, ['inStock'], true),
  };
};

const mapDistroUpdate = (item: Record<string, unknown>, index: number): DistroUpdate | null => {
  const title = readString(item, ['title']);
  const excerpt = readString(item, ['excerpt', 'summary', 'body']);
  if (!title || !excerpt) {
    return null;
  }
  return {
    id: readString(item, ['id', 'slug'], `cms-distro-update-${index}`),
    title,
    excerpt,
    date: readString(item, ['date', 'publishedAt'], new Date().toISOString().slice(0, 10)),
    href: readString(item, ['href', 'url']),
  };
};

const mapHeroRelease = (item: Record<string, unknown>, index: number): HeroRelease | null => {
  const artist = readString(item, ['artist']);
  const title = readString(item, ['title', 'name']);
  const image = readString(item, ['image', 'imageUrl', 'cover'], '/logo3.png');
  if (!artist || !title) {
    return null;
  }
  return {
    artist: artist.toUpperCase(),
    title: title.toUpperCase(),
    image: withLeadingSlash(image),
    line: readString(item, ['line', 'subtitle'], 'NEW RELEASE OUT NOW!'),
  };
};

const mapMerchItem = (item: Record<string, unknown>, index: number): MerchItem | null => {
  const name = readString(item, ['name', 'title']);
  const image = readString(item, ['image', 'imageUrl', 'cover'], '/logo3.png');
  if (!name) {
    return null;
  }
  return {
    id: readString(item, ['id', 'slug'], `cms-merch-${index}`),
    name,
    image: withLeadingSlash(image),
    price: readNumber(item, ['price'], 25),
    description: readString(item, ['description'], 'Official Selvajaria merch item.'),
    details: readStringArray(item, ['details']),
  };
};

const fetchCmsCollection = async (url: string) => {
  const headers: HeadersInit = CMS_AUTH_TOKEN ? { Authorization: `Bearer ${CMS_AUTH_TOKEN}` } : {};
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch CMS data (${response.status})`);
  }
  return response.json();
};

const fetchSanityCollection = async (query: string) => {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    throw new Error('Sanity is not configured.');
  }

  const headers: HeadersInit = SANITY_READ_TOKEN ? { Authorization: `Bearer ${SANITY_READ_TOKEN}` } : {};
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch Sanity data (${response.status})`);
  }
  const payload = (await response.json()) as { result?: unknown };
  return payload.result ?? [];
};

export default function useCmsContent() {
  const [state, setState] = useState<CmsContentState>(fallbackState);
  const sanityEnabled = useMemo(() => Boolean(SANITY_PROJECT_ID && SANITY_DATASET), []);
  const cmsEnabled = useMemo(
    () =>
      Boolean(
        sanityEnabled ||
          CMS_CATALOG_URL ||
          CMS_NEW_RELEASES_URL ||
          CMS_DISTRO_URL ||
          CMS_DISTRO_UPDATES_URL ||
          CMS_MERCH_URL
      ),
    [sanityEnabled]
  );

  useEffect(() => {
    if (!cmsEnabled) {
      return;
    }

    let cancelled = false;

    const loadCms = async () => {
      try {
        const catalogPromise = sanityEnabled
          ? fetchSanityCollection(SANITY_CATALOG_QUERY ?? DEFAULT_SANITY_CATALOG_QUERY)
          : CMS_CATALOG_URL
            ? fetchCmsCollection(CMS_CATALOG_URL)
            : Promise.resolve(null);
        const newReleasesPromise = sanityEnabled
          ? fetchSanityCollection(SANITY_NEW_RELEASES_QUERY ?? DEFAULT_SANITY_NEW_RELEASES_QUERY)
          : CMS_NEW_RELEASES_URL
            ? fetchCmsCollection(CMS_NEW_RELEASES_URL)
            : Promise.resolve(null);
        const distroPromise = sanityEnabled
          ? fetchSanityCollection(SANITY_DISTRO_QUERY ?? DEFAULT_SANITY_DISTRO_QUERY)
          : CMS_DISTRO_URL
            ? fetchCmsCollection(CMS_DISTRO_URL)
            : Promise.resolve(null);
        const distroUpdatesPromise = sanityEnabled
          ? fetchSanityCollection(SANITY_DISTRO_UPDATES_QUERY ?? DEFAULT_SANITY_DISTRO_UPDATES_QUERY)
          : CMS_DISTRO_UPDATES_URL
            ? fetchCmsCollection(CMS_DISTRO_UPDATES_URL)
            : Promise.resolve(null);
        const merchPromise = sanityEnabled
          ? fetchSanityCollection(SANITY_MERCH_QUERY ?? DEFAULT_SANITY_MERCH_QUERY)
          : CMS_MERCH_URL
            ? fetchCmsCollection(CMS_MERCH_URL)
            : Promise.resolve(null);

        const [catalogResult, newReleasesResult, distroResult, distroUpdatesResult, merchResult] = await Promise.allSettled([
          catalogPromise,
          newReleasesPromise,
          distroPromise,
          distroUpdatesPromise,
          merchPromise,
        ]);

        if (cancelled) {
          return;
        }

        const catalogResponse = catalogResult.status === 'fulfilled' ? catalogResult.value : null;
        const newReleasesResponse = newReleasesResult.status === 'fulfilled' ? newReleasesResult.value : null;
        const distroResponse = distroResult.status === 'fulfilled' ? distroResult.value : null;
        const distroUpdatesResponse = distroUpdatesResult.status === 'fulfilled' ? distroUpdatesResult.value : null;
        const merchResponse = merchResult.status === 'fulfilled' ? merchResult.value : null;

        const failures = [catalogResult, newReleasesResult, distroResult, distroUpdatesResult, merchResult]
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .map((result) => result.reason?.message ?? 'Unknown CMS fetch error');

        const nextCatalog = unwrapArray(catalogResponse)
          .map(mapRelease)
          .filter((item): item is Release => item !== null);
        const nextFeatured = unwrapArray(newReleasesResponse)
          .map(mapHeroRelease)
          .filter((item): item is HeroRelease => item !== null);
        const nextDistro = unwrapArray(distroResponse)
          .map(mapDistroItem)
          .filter((item): item is DistroItem => item !== null);
        const nextUpdates = unwrapArray(distroUpdatesResponse)
          .map(mapDistroUpdate)
          .filter((item): item is DistroUpdate => item !== null);
        const nextMerch = unwrapArray(merchResponse)
          .map(mapMerchItem)
          .filter((item): item is MerchItem => item !== null);

        setState({
          catalogReleases: nextCatalog.length > 0 ? nextCatalog : fallbackCatalogReleases,
          featuredReleases:
            nextFeatured.length > 0
              ? nextFeatured
              : fallbackSeededFeaturedReleases.length > 0
                ? fallbackSeededFeaturedReleases
                : fallbackFeaturedReleases,
          distroItems: nextDistro.length > 0 ? nextDistro : fallbackDistroItems,
          distroUpdates: nextUpdates,
          merchItems: nextMerch.length > 0 ? nextMerch : merchItems,
          cmsEnabled: true,
          cmsError: failures.length > 0 ? failures.join(' | ') : null,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }
        setState((prev) => ({
          ...prev,
          cmsEnabled: true,
          cmsError: error instanceof Error ? error.message : 'Unable to load CMS data.',
        }));
      }
    };

    void loadCms();
    return () => {
      cancelled = true;
    };
  }, [cmsEnabled]);

  return state;
}
