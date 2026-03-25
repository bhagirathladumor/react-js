import { useState } from 'react';
import Wheel from './Wheel';
import SpinButton from './SpinButton';
import ResultModal from './ResultModal';

export default function SpinWheel() {
  const initialRewards = [
    { id: 1, text: '10% OFF', color: 'bg-gradient-to-br from-red-500 to-red-600' },
    { id: 2, text: 'FREE GIFT', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 3, text: 'TRY AGAIN', color: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    { id: 4, text: '50% OFF', color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
    { id: 5, text: '20% OFF', color: 'bg-gradient-to-br from-amber-500 to-amber-600' },
    { id: 6, text: 'FREE SHIPPING', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { id: 7, text: 'TRY AGAIN', color: 'bg-gradient-to-br from-slate-500 to-slate-600' },
  ];

  const [rewards, setRewards] = useState(initialRewards);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowModal(false);

    // Generate random offers for each spin
    const allOffers = [
      { text: '10% OFF', color: 'bg-gradient-to-br from-red-500 to-red-600' },
      { text: '20% OFF', color: 'bg-gradient-to-br from-amber-500 to-amber-600' },
      { text: '30% OFF', color: 'bg-gradient-to-br from-pink-500 to-pink-600' },
      { text: '40% OFF', color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
      { text: '50% OFF', color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
      { text: 'FREE GIFT', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
      { text: 'FREE SHIPPING', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
      { text: 'BUY 1 GET 1', color: 'bg-gradient-to-br from-teal-500 to-teal-600' },
      { text: 'CASHBACK', color: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
      { text: 'TRY AGAIN', color: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    ];

    // Shuffle and pick 7 random offers
    const shuffled = [...allOffers].sort(() => Math.random() - 0.5);
    const selectedOffers = shuffled.slice(0, 7).map((offer, idx) => ({
      id: idx + 1,
      ...offer
    }));

    // Update rewards state
    setRewards(selectedOffers);

    const minSpins = 10;
    const maxSpins = 15;
    const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
    
    const segmentAngle = 360 / selectedOffers.length;
    const randomIndex = Math.floor(Math.random() * selectedOffers.length);
    const targetAngle = 360 - (randomIndex * segmentAngle + segmentAngle / 2);
    
    // Add current rotation to make each spin faster
    const totalRotation = rotation + spins * 360 + targetAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setWinner(selectedOffers[randomIndex]);
      setShowModal(true);
      setIsSpinning(false);
      
      if (selectedOffers[randomIndex].text !== 'TRY AGAIN') {
        triggerConfetti();
      }
    }, 5000);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 2;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)];
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
      }
      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center relative z-10">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2 animate-pulse">
            SPIN TO WIN
          </h1>
          <p className="text-yellow-300 text-xl md:text-2xl font-semibold tracking-wide">🎁 Try Your Luck Today! 🎁</p>
        </div>
        
        <div className="relative inline-block mb-6">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          
          <Wheel rewards={rewards} rotation={rotation} isSpinning={isSpinning} />
          <SpinButton onClick={spinWheel} isSpinning={isSpinning} />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 inline-block border border-white/20 shadow-2xl">
          <p className="text-white text-base md:text-lg font-medium">
            {isSpinning ? '🎰 Spinning... Good Luck! 🍀' : '👆 Click SPIN to win amazing prizes!'}
          </p>
        </div>
      </div>

      {showModal && <ResultModal winner={winner} onClose={() => setShowModal(false)} />}
    </div>
  );
}
