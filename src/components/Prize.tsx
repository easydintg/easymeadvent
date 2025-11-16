import { motion } from 'motion/react';
import { Sparkles, Award, Gift } from 'lucide-react';
import logo from 'figma:asset/ac1f67cd2f373fe5e4a8c3d4846dcea09bb019c8.png';

interface PrizeProps {
  isUnlocked: boolean;
}

export function Prize({ isUnlocked }: PrizeProps) {
  return (
    <div className="flex justify-center">
      <motion.div
        className="relative max-w-md w-full"
        animate={isUnlocked ? {
          scale: [1, 1.02, 1],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Premium glow effect when unlocked */}
        {isUnlocked && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#7a9375] via-[#a4b8a0] to-[#c5d4c1] opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 opacity-10 blur-2xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        )}

        <div
          className={`
            relative rounded-[2rem] text-center space-y-6 p-8
            transition-all duration-500 
            ${
              isUnlocked
                ? 'bg-gradient-to-br from-[#7a9375] via-[#a4b8a0] to-[#c5d4c1] shadow-2xl border-4 border-white/30'
                : 'bg-white/90 backdrop-blur-sm shadow-xl border-4 border-[#e8ede7]'
            }
          `}
        >
          {/* Golden confetti effect */}
          {isUnlocked && (
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    opacity: 0,
                    rotate: Math.random() * 720,
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                >
                  {['🎊', '✨', '⭐', '💫', '🌟'][i % 5]}
                </motion.div>
              ))}
            </div>
          )}

          {/* Header with icons */}
          <div className="flex items-center justify-center gap-3">
            <Award className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-[#a4b8a0]'}`} />
            <h2 className={isUnlocked ? 'text-white' : 'text-[#5d7559]'}>
              Эксклюзивный приз
            </h2>
            <Award className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-[#a4b8a0]'}`} />
          </div>

          {/* T-shirt presentation with logo */}
          <div className="relative py-8">
            <motion.div
              className={`relative inline-block ${isUnlocked ? 'filter-none' : 'grayscale opacity-50'}`}
              animate={isUnlocked ? {
                y: [-5, 5, -5],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* T-shirt */}
              <div className="text-8xl mb-2">
                👕
              </div>
              
              {/* Logo on t-shirt */}
              {isUnlocked && (
                <motion.img
                  src={logo}
                  alt="easyme"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.3, 
                    type: 'spring', 
                    stiffness: 200 
                  }}
                />
              )}
            </motion.div>

            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Gift className="w-16 h-16 text-[#c5d4c1]" />
              </div>
            )}
          </div>

          {/* Prize description */}
          <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={logo} alt="easyme" className="w-8 h-8" />
              <p className={`${isUnlocked ? 'text-white' : 'text-[#7a9375]'}`}>
                Фирменная футболка easyme
              </p>
            </div>
            
            <div className={`space-y-1 ${isUnlocked ? 'text-white' : 'text-[#5d7559]'}`}>
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Премиум качество</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Эксклюзивный дизайн</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Ограниченный тираж</span>
              </p>
            </div>
          </div>

          {/* Status text */}
          <div className="space-y-3">
            <p className={`${isUnlocked ? 'text-white' : 'text-[#7a9375]'}`}>
              {isUnlocked 
                ? '🎊 Невероятно! Ты прошла весь путь! 🎊' 
                : 'Пройди все 21 день марафона'
              }
            </p>

            {isUnlocked && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full mt-4 py-4 px-8 bg-white text-[#7a9375] rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                <span>Забрать свой приз</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
