import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Award, Gift } from 'lucide-react';
import logo from 'figma:asset/ac1f67cd2f373fe5e4a8c3d4846dcea09bb019c8.png';

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrizeModal({ isOpen, onClose }: PrizeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative bg-gradient-to-br from-[#7a9375] via-[#a4b8a0] to-[#c5d4c1] rounded-[2rem] shadow-2xl max-w-lg w-full p-10 pointer-events-auto overflow-hidden border-4 border-white/30"
            >
              {/* Animated golden rays */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,215,0,0.3) 45deg, transparent 90deg, rgba(255,215,0,0.3) 135deg, transparent 180deg, rgba(255,215,0,0.3) 225deg, transparent 270deg, rgba(255,215,0,0.3) 315deg, transparent 360deg)',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Floating confetti */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(60)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{
                      x: `${Math.random() * 100}%`,
                      y: '-10%',
                      rotate: 0,
                    }}
                    animate={{
                      y: '110%',
                      rotate: 360,
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: 'linear',
                    }}
                  >
                    {['🎉', '✨', '⭐', '💫', '🎊', '🌟'][i % 6]}
                  </motion.div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-[#5d7559]" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center space-y-6">
                {/* Trophy/Award animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-2xl mb-4">
                    <Award className="w-14 h-14 text-[#7a9375]" />
                  </div>
                </motion.div>

                {/* Congratulations text */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <h1 className="text-white">
                      Поздравляем! 🎊
                    </h1>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90"
                  >
                    Ты прошла все 21 день новогоднего марафона!
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center gap-2 text-white/80"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Это настоящее достижение!</span>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Prize presentation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
                  className="relative py-8"
                >
                  <div className="relative inline-block">
                    {/* Glowing background */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    
                    {/* T-shirt */}
                    <div className="relative text-9xl">
                      👕
                    </div>
                    
                    {/* Logo on t-shirt */}
                    <motion.img
                      src={logo}
                      alt="easyme"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 drop-shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.2, 
                        type: 'spring', 
                        stiffness: 200 
                      }}
                    />
                  </div>
                </motion.div>

                {/* Prize details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-white/20 backdrop-blur-md rounded-3xl p-6 space-y-4 border-2 border-white/30"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img src={logo} alt="easyme" className="w-10 h-10" />
                    <h3 className="text-white">
                      Фирменная футболка easyme
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-white/90">
                    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-2xl p-3">
                      <Sparkles className="w-5 h-5" />
                      <span>Премиум</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-2xl p-3">
                      <Award className="w-5 h-5" />
                      <span>Эксклюзив</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-2xl p-3">
                      <Gift className="w-5 h-5" />
                      <span>Лимитед</span>
                    </div>
                  </div>

                  <p className="text-white/90 italic">
                    Ты заслужила этот приз своим упорством и целеустремленностью! 💚
                  </p>
                </motion.div>

                {/* Action button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  onClick={onClose}
                  className="w-full py-4 px-6 bg-white text-[#7a9375] rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Gift className="w-6 h-6" />
                  <span>Забрать мой приз</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
