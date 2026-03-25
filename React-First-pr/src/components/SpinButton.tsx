interface SpinButtonProps {
  onClick: () => void;
  isSpinning: boolean;
}

export default function SpinButton({ onClick, isSpinning }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isSpinning}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 font-black shadow-2xl z-10 transition-all duration-200 border-4 border-yellow-400 ${
        isSpinning
          ? 'opacity-70 cursor-not-allowed scale-90 animate-pulse'
          : 'hover:scale-110 hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] active:scale-95 hover:-rotate-6'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full p-3">
        <div className="text-4xl mb-2">{isSpinning ? '⚡' : '🎴'}</div>
        <div className="text-xs font-bold text-gray-500 mb-1">LUCKY</div>
        <div className="text-2xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {isSpinning ? 'WAIT' : 'CARD'}
        </div>
        <div className="text-xs text-gray-400 mt-1">Click Me!</div>
      </div>
    </button>
  );
}
