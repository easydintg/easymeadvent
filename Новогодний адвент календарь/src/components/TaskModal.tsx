import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { getTaskForDay } from './tasks';

interface TaskModalProps {
  day: number | null;
  isCompleted: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function TaskModal({ day, isCompleted, onClose, onToggle }: TaskModalProps) {
  if (!day) return null;
  
  const taskData = getTaskForDay(day);
  if (!taskData) return null;

  return (
    <AnimatePresence>
      {day && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 pointer-events-auto overflow-hidden border-4 border-[#a4b8a0]/30"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ef] via-white to-[#e8ede7] opacity-60" />
              
              {/* Organic shapes decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5d4c1] rounded-full blur-3xl opacity-30" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#a4b8a0] rounded-full blur-2xl opacity-30" />

              {/* Floating snowflakes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl text-white/40"
                    initial={{
                      x: `${Math.random() * 100}%`,
                      y: '-10%',
                    }}
                    animate={{
                      y: '110%',
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: 'linear',
                    }}
                  >
                    ❄
                  </motion.div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
              >
                <X className="w-5 h-5 text-[#5d7559]" />
              </button>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Day badge */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7a9375] to-[#a4b8a0] text-white rounded-full shadow-lg">
                    <span>День {day}</span>
                  </div>
                </div>

                {/* Task emoji */}
                <motion.div
                  className="text-7xl text-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {taskData.emoji}
                </motion.div>

                {/* Task description */}
                <div className="text-center space-y-2">
                  <h3 className="text-[#5d7559]">
                    {taskData.task}
                  </h3>
                  
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 text-[#7a9375]"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Выполнено!</span>
                    </motion.div>
                  )}
                </div>

                {/* Action button */}
                <button
                  onClick={() => {
                    onToggle();
                    setTimeout(onClose, 300);
                  }}
                  className={`
                    w-full py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3
                    ${
                      isCompleted
                        ? 'bg-white border-2 border-[#a4b8a0] text-[#7a9375]'
                        : 'bg-gradient-to-r from-[#7a9375] to-[#a4b8a0] text-white'
                    }
                  `}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Отменить выполнение</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5" />
                      <span>Отметить выполненным</span>
                    </>
                  )}
                </button>

                {/* Motivational text */}
                <p className="text-center text-[#7a9375] italic">
                  {isCompleted 
                    ? "Отличная работа! Продолжай в том же духе! 💚"
                    : "Ты справишься! Каждый день - шаг к цели! 🌟"
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
