import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INPUT_PATH = path.join(ROOT, 'docs', 'Catalogo SR.csv');
const CAPAS_DIR = path.join(ROOT, 'public', 'capas');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'import');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'catalog-release-seed.json');

const normalizeHeader = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/\s+/g, '_');

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const titleCase = (value) =>
  value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const normalizeKey = (value) => normalizeText(value).replace(/\s+/g, '');

const coverFiles = fs.existsSync(CAPAS_DIR)
  ? fs
      .readdirSync(CAPAS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const ext = path.extname(entry.name);
        const baseName = path.basename(entry.name, ext);
        return {
          fileName: entry.name,
          baseName,
          normalizedBase: normalizeText(baseName),
          normalizedBaseNoDigits: normalizeText(baseName.replace(/\d+/g, ' ')),
          keyBase: normalizeKey(baseName),
          keyBaseNoDigits: normalizeKey(baseName.replace(/\d+/g, ' ')),
        };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName))
  : [];

const coverByArtistTitle = new Map();
const artistCoverIndex = new Map();
const explicitCoverOverridesByCatalog = new Map([
  ['SR004CD003', '/capas/deathlike capa.jpg'],
  ['SR002LP001', '/capas/animalesco capa camp.jpg'],
  ['SR026CD021', '/capas/battlescars nagasaki.jpg'],
  ['SR033K7004', '/logo3.png'],
]);

function selectCoverImage(artist, title, catalogNo = '') {
  if (coverFiles.length === 0) return '/logo3.png';

  const normalizedCatalogNo = catalogNo.trim().toUpperCase();
  if (explicitCoverOverridesByCatalog.has(normalizedCatalogNo)) {
    return explicitCoverOverridesByCatalog.get(normalizedCatalogNo);
  }
  const cacheKey = `${normalizeText(artist)}|${normalizeText(title)}`;
  const cached = coverByArtistTitle.get(cacheKey);
  if (cached) return cached;

  const artistNorm = normalizeText(artist);
  const titleNorm = normalizeText(title);
  const artistKey = normalizeKey(artist);
  const titleKey = normalizeKey(title);

  const artistMatches = coverFiles.filter(
    (cover) =>
      cover.normalizedBase.includes(artistNorm) ||
      cover.normalizedBaseNoDigits.includes(artistNorm) ||
      cover.keyBase.includes(artistKey) ||
      cover.keyBaseNoDigits.includes(artistKey)
  );
  const exactMatches = artistMatches.filter(
    (cover) =>
      cover.normalizedBase.includes(titleNorm) ||
      cover.normalizedBaseNoDigits.includes(titleNorm) ||
      cover.keyBase.includes(titleKey) ||
      cover.keyBaseNoDigits.includes(titleKey)
  );

  let selected = null;
  if (exactMatches.length > 0) {
    selected = exactMatches[0];
  } else if (artistMatches.length > 0) {
    const idx = artistCoverIndex.get(artistNorm) ?? 0;
    selected = artistMatches[Math.min(idx, artistMatches.length - 1)];
    artistCoverIndex.set(artistNorm, idx + 1);
  }

  const imagePath = selected ? `/capas/${selected.fileName}` : '/logo3.png';
  coverByArtistTitle.set(cacheKey, imagePath);
  return imagePath;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.trim().length > 0)) rows.push(row);
      row = [];
      continue;
    }

    field += ch;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim().length > 0)) rows.push(row);
  }

  return rows;
}

function parseDateToYear(value) {
  const cleaned = value.trim();
  if (!cleaned) return undefined;
  const match = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return undefined;
  return Number(match[3]);
}

function parseDateToIso(value) {
  const cleaned = value.trim();
  if (!cleaned) return undefined;
  const match = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return undefined;
  const day = match[1].padStart(2, '0');
  const month = match[2].padStart(2, '0');
  const year = match[3];
  return `${year}-${month}-${day}`;
}

function normalizePrice(value) {
  const cleaned = value.trim();
  if (!cleaned || cleaned === '\\') return null;
  const numeric = Number(cleaned.replace(',', '.'));
  return Number.isFinite(numeric) ? numeric : null;
}

function normalizeInStock(value) {
  const status = value.trim().toLowerCase();
  if (status === 'sold out') return false;
  if (status === 'in stock') return true;
  if (status === 'in sotck') return true;
  if (status === 'low stock') return true;
  return true;
}

function normalizeFormat(value) {
  const raw = value.trim().toLowerCase();
  if (raw.includes('vinyl') || raw === 'lp') return ['vinyl'];
  if (raw.includes('tape') || raw.includes('cassette')) return ['tape'];
  if (raw.includes('cd') || raw.includes('digipak')) return ['cd'];
  return ['cd'];
}

function normalizeCountry(value) {
  const cleaned = value.trim();
  if (!cleaned) return [];
  return [slugify(cleaned)];
}

function normalizeGenre(value) {
  const cleaned = value.trim();
  return cleaned ? titleCase(cleaned) : 'Unknown';
}

function buildCatalogItem(raw, index) {
  const read = (...keys) => {
    for (const key of keys) {
      const value = raw[key];
      if (typeof value === 'string' && value.trim().length > 0) return value;
    }
    return '';
  };

  const artist = raw.artista?.trim() || '';
  const title = raw.titulo?.trim() || '';
  const formatRaw = read('formato').trim();
  const dateRaw = raw.data?.trim() || '';
  const priceRaw = read('preco', 'pre_o').trim();
  const statusRaw = raw.estado?.trim() || '';
  const genreRaw = raw.estilo?.trim() || '';
  const countryRaw = read('pais', 'pa_s').trim();
  const linkRaw = raw.link?.trim() || '';
  const catalogNo = raw.num_cat?.trim() || '';
  const commentRaw = raw.comentario?.trim() || '';

  if (!artist || !title) return null;

  const price = normalizePrice(priceRaw);
  const year = parseDateToYear(dateRaw);
  const releaseDate = parseDateToIso(dateRaw);
  const idBase = slugify(`${artist}-${title}`);
  const id = catalogNo ? `${idBase}-${slugify(catalogNo)}` : `${idBase}-${index + 1}`;

  const details = [];
  if (catalogNo) details.push(`Catalog No: ${catalogNo}`);
  if (formatRaw && normalizeFormat(formatRaw)[0] !== formatRaw.toLowerCase()) {
    details.push(`Original format source: ${formatRaw}`);
  }
  if (commentRaw) details.push(commentRaw);

  return {
    id,
    artist: titleCase(artist),
    title,
    formats: normalizeFormat(formatRaw),
    ...(price !== null ? { price } : {}),
    image: selectCoverImage(artist, title, catalogNo),
    genre: normalizeGenre(genreRaw),
    ...(year ? { year } : {}),
    ...(releaseDate ? { releaseDate } : {}),
    description: commentRaw || '',
    details,
    trackHighlights: [],
    listeningUrl: linkRaw || undefined,
    inStock: normalizeInStock(statusRaw),
    countries: normalizeCountry(countryRaw),
    isLatest: false,
  };
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Input not found: ${INPUT_PATH}`);
  }

  const csvRaw = fs.readFileSync(INPUT_PATH, 'latin1').replace(/^\uFEFF|^ï»¿/, '');
  const rows = parseCsv(csvRaw);
  if (rows.length < 2) {
    throw new Error('CSV has no data rows.');
  }

  const headers = rows[0].map(normalizeHeader);
  const dataRows = rows.slice(1);

  const parsed = dataRows
    .map((row) => {
      const record = {};
      headers.forEach((header, idx) => {
        record[header] = (row[idx] ?? '').trim();
      });
      return record;
    })
    .map(buildCatalogItem)
    .filter(Boolean);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');

  console.log(`Imported ${parsed.length} catalog releases`);
  console.log(`Output: ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main();
