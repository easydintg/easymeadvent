import { motion } from 'motion/react';
import { Check, Lock, Sparkles } from 'lucide-react';

interface DayStepProps {
  day: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

export function DayStep({ day, isCompleted, isUnlocked, onClick }: DayStepProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!isUnlocked}
      className="relative group"
      whileHover={isUnlocked ? { scale: 1.1 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
    >
      {/* Glow effect */}
      {isCompleted && (
        <motion.div
          className="absolute inset-0 rounded-full bg-[#a4b8a0] opacity-50 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main circle with organic feel */}
      <div
        className={`
          relative w-20 h-20 rounded-full flex flex-col items-center justify-center
          transition-all duration-300 shadow-lg
          ${
            isCompleted
              ? 'bg-gradient-to-br from-[#7a9375] via-[#a4b8a0] to-[#c5d4c1] text-white border-2 border-white/50'
              : isUnlocked
              ? 'bg-white text-[#5d7559] hover:shadow-xl hover:border-[#a4b8a0] border-2 border-[#e8ede7]'
              : 'bg-[#f5f7f5] text-gray-400 border-2 border-[#e8ede7]'
          }
        `}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Check className="w-8 h-8" strokeWidth={3} />
          </motion.div>
        ) : !isUnlocked ? (
          <Lock className="w-6 h-6" />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-5 h-5 text-[#a4b8a0]" />
            <span className="text-[#7a9375]">День</span>
          </div>
        )}
      </div>

      {/* Day number badge */}
      <div
        className={`
          absolute -bottom-2 left-1/2 -translate-x-1/2
          px-3 py-1 rounded-full text-white shadow-md
          ${
            isCompleted
              ? 'bg-gradient-to-r from-[#7a9375] to-[#a4b8a0]'
              : isUnlocked
              ? 'bg-gradient-to-r from-[#8fa88a] to-[#a4b8a0]'
              : 'bg-gray-300'
          }
        `}
      >
        {day}
      </div>

      {/* Sparkle decorations for completed */}
      {isCompleted && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 text-2xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute -bottom-3 -left-1 text-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            ✨
          </motion.div>
        </>
      )}

      {/* Hover hint for unlocked days */}
      {isUnlocked && !isCompleted && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#7a9375] text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          Нажми чтобы открыть
        </motion.div>
      )}
    </motion.button>
  );
}
