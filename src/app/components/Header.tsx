interface HeaderProps {
  onHome: () => void;
}
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="border-b border-[#769a75]/70 bg-[#0b120b]/65 py-4 backdrop-blur-[2px]">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <button onClick={onHome} className="cursor-pointer" aria-label="Go to home releases page">
          <img
            src={asset('/logo1.png')}
            alt="Selvajaria Records"
            className="h-24 w-auto object-contain md:h-32"
          />
        </button>
        <p
          className="mt-2 uppercase text-center"
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: '#f4fbf3',
          }}
        >
          Independent Underground Label
        </p>
      </div>
    </header>
  );
}
