interface Reward {
  id: number;
  text: string;
  color: string;
}

interface WheelProps {
  rewards: Reward[];
  rotation: number;
  isSpinning: boolean;
}

export default function Wheel({ rewards, rotation, isSpinning }: WheelProps) {
  const segmentAngle = 360 / rewards.length;

  return (
    <div className="relative">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20">
        <div className="relative">
          <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-yellow-400 drop-shadow-2xl"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-yellow-300"></div>
        </div>
      </div>

      {/* Outer Ring */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 animate-pulse"></div>
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"></div>

      {/* Wheel Container */}
      <div
        className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full shadow-2xl overflow-hidden border-8 border-white"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
        }}
      >
        {/* Segments */}
        {rewards.map((reward, index) => {
          const angle = segmentAngle * index;
          return (
            <div
              key={reward.id}
              className={`absolute w-full h-full ${reward.color}`}
              style={{
                clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + segmentAngle - 90) * Math.PI / 180)}%)`,
              }}
            >
            </div>
          );
        })}

        {/* Center Circle Border */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-inner"></div>
      </div>
    </div>
  );
}
