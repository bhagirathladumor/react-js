interface Winner {
  text: string;
  color: string;
}

interface ResultModalProps {
  winner: Winner | null;
  onClose: () => void;
}

export default function ResultModal({ winner, onClose }: ResultModalProps) {
  if (!winner) return null;

  const isWin = winner.text !== 'TRY AGAIN';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl transform animate-bounce-in border-4 border-yellow-400">
        <div className="text-center">
          <div className="text-7xl md:text-8xl mb-6 animate-bounce">
            {isWin ? '🎉' : '😢'}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {isWin ? 'CONGRATULATIONS!' : 'OOPS!'}
          </h2>
          
          <div className="relative mb-6">
            <div className={`${winner.color} text-white text-2xl md:text-3xl font-black py-6 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform`}>
              {winner.text}
            </div>
            {isWin && (
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-30 -z-10"></div>
            )}
          </div>
          
          <p className="text-gray-700 text-base md:text-lg mb-8 font-medium">
            {isWin 
              ? '🎁 Amazing! You won an exclusive prize! Use it on your next purchase.' 
              : '🔄 Don\'t worry! Spin again for another chance to win big.'}
          </p>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-lg py-4 px-10 rounded-full hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 shadow-xl border-2 border-white"
          >
            {isWin ? '🎁 Claim Prize' : '🔁 Spin Again'}
          </button>
        </div>
      </div>
    </div>
  );
}
