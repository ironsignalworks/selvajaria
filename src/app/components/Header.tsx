interface HeaderProps {
  onHome: () => void;
}
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="border-b-2 border-[#769a75] bg-[#0b120b]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex min-h-20 items-center justify-center py-3">
          <button onClick={onHome} className="group flex items-center gap-3" aria-label="Go to home releases page">
            <div className="brutalist-border brutalist-shadow flex h-11 w-11 items-center justify-center bg-[#131e13]">
              <img src={asset('/logo1.png')} alt="Selvajaria Records" className="h-7 w-7 object-contain" />
            </div>
            <div className="text-left">
              <p className="font-display text-2xl font-bold uppercase tracking-tight text-[#f4fbf3]">
                Selvajaria <span className="text-[#00C747]">Records</span>
              </p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#769a75]">
                Independent Underground Label
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

