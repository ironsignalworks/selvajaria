import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

export default function FilterSidebar() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
          color: '#00FF5A'
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
              className="border-[#769a75] data-[state=checked]:bg-[#00FF5A] data-[state=checked]:border-[#00FF5A]"
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
    setSelectedFormats(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleGenre = (id: string) => {
    setSelectedGenres(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 pr-8">
      <div className="sticky top-24">
        <h2 
          className="uppercase mb-6 pb-3 border-b-2 border-[#00FF5A]"
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
          selectedItems={selectedFormats}
          onToggle={toggleFormat}
        />

        <FilterSection
          title="Genre"
          items={genres}
          selectedItems={selectedGenres}
          onToggle={toggleGenre}
        />

        <FilterSection
          title="Country"
          items={countries}
          selectedItems={[]}
          onToggle={() => {}}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Checkbox
              id="in-stock"
              className="border-[#769a75] data-[state=checked]:bg-[#00FF5A] data-[state=checked]:border-[#00FF5A]"
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
          className="w-full px-4 py-3 border border-[#00FF5A] text-[#00FF5A] uppercase tracking-wider hover:bg-[#00FF5A] hover:text-[#131e13] transition-all"
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
