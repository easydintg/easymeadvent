import { DayStep } from './DayStep';
import { Prize } from './Prize';

interface AdventPathProps {
  completedDays: number[];
  onToggleDay: (day: number) => void;
  onDayClick: (day: number, isUnlocked: boolean) => void;
}

export function AdventPath({ completedDays, onToggleDay, onDayClick }: AdventPathProps) {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  
  // Create more organic, curved path with waves
  const getStepPosition = (index: number) => {
    const totalDays = 21;
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    // More organic wave pattern
    const wave = Math.sin(index * 0.5) * 0.3;
    const actualCol = row % 2 === 0 ? col + wave : 2 - col + wave;
    
    return {
      row,
      col: Math.max(0, Math.min(2, actualCol)),
      offsetY: Math.sin(index * 0.7) * 20,
      offsetX: Math.cos(index * 0.4) * 15,
    };
  };

  return (
    <div className="relative z-10 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Path container */}
        <div className="relative">
          {/* Curved path SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {days.slice(0, -1).map((day, i) => {
              const current = getStepPosition(i);
              const next = getStepPosition(i + 1);
              
              const startX = `calc(${current.col * 33.33 + 16.67}% + ${current.offsetX}px)`;
              const startY = `${current.row * 160 + 80 + current.offsetY}px`;
              const endX = `calc(${next.col * 33.33 + 16.67}% + ${next.offsetX}px)`;
              const endY = `${next.row * 160 + 80 + next.offsetY}px`;
              
              // Control points for bezier curve
              const midX = `calc((${current.col * 33.33 + 16.67}% + ${next.col * 33.33 + 16.67}%) / 2 + ${(current.offsetX + next.offsetX) / 2}px)`;
              const midY = `${(current.row * 160 + 80 + current.offsetY + next.row * 160 + 80 + next.offsetY) / 2 + Math.sin(i) * 30}px`;
              
              const isCompleted = completedDays.includes(day) && completedDays.includes(day + 1);
              
              return (
                <path
                  key={i}
                  d={`M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`}
                  stroke={isCompleted ? 'url(#greenGradient)' : '#d1dfd0'}
                  strokeWidth="4"
                  strokeDasharray={isCompleted ? '0' : '10,10'}
                  fill="none"
                  className="transition-all duration-500"
                  style={{
                    filter: isCompleted ? 'drop-shadow(0 0 8px rgba(164, 184, 160, 0.6))' : 'none'
                  }}
                />
              );
            })}
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a9375" />
                <stop offset="50%" stopColor="#a4b8a0" />
                <stop offset="100%" stopColor="#7a9375" />
              </linearGradient>
            </defs>
          </svg>

          {/* Days grid with organic positions */}
          <div className="relative" style={{ minHeight: '1400px' }}>
            {days.map((day, index) => {
              const position = getStepPosition(index);
              const isCompleted = completedDays.includes(day);
              const isUnlocked = day === 1 || completedDays.includes(day - 1);
              
              return (
                <div
                  key={day}
                  className="absolute"
                  style={{
                    left: `calc(${position.col * 33.33 + 16.67}% + ${position.offsetX}px)`,
                    top: `${position.row * 160 + 80 + position.offsetY}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                >
                  <DayStep
                    day={day}
                    isCompleted={isCompleted}
                    isUnlocked={isUnlocked}
                    onClick={() => onDayClick(day, isUnlocked)}
                  />
                </div>
              );
            })}
          </div>

          {/* Prize at the end */}
          <div className="mt-12">
            <Prize isUnlocked={completedDays.length === 21} />
          </div>
        </div>
      </div>
    </div>
  );
}
