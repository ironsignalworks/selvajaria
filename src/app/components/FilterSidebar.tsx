import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

export interface CatalogFilters {
  formats: string[];
  genres: string[];
  countries: string[];
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  value?: CatalogFilters;
  onChange?: (next: CatalogFilters) => void;
}

const EMPTY_FILTERS: CatalogFilters = {
  formats: [],
  genres: [],
  countries: [],
  inStockOnly: false,
};

export default function FilterSidebar({ value, onChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<CatalogFilters>(EMPTY_FILTERS);
  const filters = value ?? localFilters;

  const setFilters = (updater: (prev: CatalogFilters) => CatalogFilters) => {
    if (value && onChange) {
      onChange(updater(value));
      return;
    }
    setLocalFilters(updater);
  };

  const formats = [
    { id: 'vinyl', label: 'Vinyl' },
    { id: 'cd', label: 'CD' },
    { id: 'tape', label: 'Cassette' },
    { id: 'digital', label: 'Digital' },
  ];

  const genres = [
    { id: 'thrash', label: 'Thrash' },
    { id: 'death', label: 'Death' },
    { id: 'black', label: 'Black' },
    { id: 'heavy', label: 'Heavy' },
    { id: 'doom', label: 'Doom' },
  ];

  const countries = [
    { id: 'portugal', label: 'Portugal' },
    { id: 'brazil', label: 'Brazil' },
    { id: 'spain', label: 'Spain' },
    { id: 'worldwide', label: 'Worldwide' },
  ];

  const FilterSection = ({ 
    title, 
    items, 
    selectedItems, 
    onToggle 
  }: { 
    title: string; 
    items: { id: string; label: string }[];
    selectedItems: string[];
    onToggle: (id: string) => void;
  }) => (
    <div className="mb-8">
      <h3 
        className="uppercase mb-4 pb-2 border-b border-[#769a75]/30"
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#00C747'
        }}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => onToggle(item.id)}
              className="border-[#769a75] data-[state=checked]:bg-[#00C747] data-[state=checked]:border-[#00C747]"
            />
            <label
              htmlFor={item.id}
              className="cursor-pointer uppercase"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#f4fbf3'
              }}
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const toggleFormat = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(id) ? prev.formats.filter((f) => f !== id) : [...prev.formats, id],
    }));
  };

  const toggleGenre = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(id) ? prev.genres.filter((g) => g !== id) : [...prev.genres, id],
    }));
  };

  const toggleCountry = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(id) ? prev.countries.filter((c) => c !== id) : [...prev.countries, id],
    }));
  };

  return (
    <aside className="w-64 pr-8">
      <div className="sticky top-24">
        <h2 
          className="mb-6 border-b-2 border-[#00C747] pb-3 font-display uppercase"
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#f4fbf3'
          }}
        >
          Filter Releases
        </h2>

        <FilterSection
          title="Format"
          items={formats}
          selectedItems={filters.formats}
          onToggle={toggleFormat}
        />

        <FilterSection
          title="Genre"
          items={genres}
          selectedItems={filters.genres}
          onToggle={toggleGenre}
        />

        <FilterSection
          title="Country"
          items={countries}
          selectedItems={filters.countries}
          onToggle={toggleCountry}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, inStockOnly: checked === true }))
              }
              className="border-[#769a75] data-[state=checked]:bg-[#00C747] data-[state=checked]:border-[#00C747]"
            />
            <label
              htmlFor="in-stock"
              className="cursor-pointer uppercase"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#f4fbf3'
              }}
            >
              In Stock Only
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFilters(() => EMPTY_FILTERS)}
          className="brutalist-border w-full border-[#00C747] px-4 py-3 text-[#00C747] uppercase tracking-wider transition-colors hover:bg-[#00C747] hover:text-[#131e13]"
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}

