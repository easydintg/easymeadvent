import { useState, useEffect } from 'react';
import { AdventPath } from './components/AdventPath';
import { Header } from './components/Header';
import { PrizeModal } from './components/PrizeModal';
import { TaskModal } from './components/TaskModal';
import logo from 'figma:asset/ac1f67cd2f373fe5e4a8c3d4846dcea09bb019c8.png';
import { initTelegramWebApp, getTelegramUser, isTelegramWebApp } from './utils/telegram';
import { getProgress, saveProgress, registerUser } from './utils/api';

export default function App() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  // Initialize Telegram WebApp and load user progress
  useEffect(() => {
    const initialize = async () => {
      // Initialize Telegram WebApp
      if (isTelegramWebApp()) {
        initTelegramWebApp();
        
        const telegramUser = getTelegramUser();
        if (telegramUser) {
          const userIdString = telegramUser.id.toString();
          setUserId(userIdString);

          // Register user if first time
          await registerUser(
            userIdString,
            telegramUser.first_name,
            telegramUser.last_name,
            telegramUser.username
          );

          // Load user's progress
          const progress = await getProgress(userIdString);
          setCompletedDays(progress);
        }
      } else {
        // For testing outside Telegram, use demo user
        const demoUserId = 'demo_user';
        setUserId(demoUserId);
        const progress = await getProgress(demoUserId);
        setCompletedDays(progress);
      }

      setIsLoading(false);
    };

    initialize();
  }, []);

  // Save progress when completedDays changes
  useEffect(() => {
    if (userId && !isLoading) {
      saveProgress(userId, completedDays);
    }
  }, [completedDays, userId, isLoading]);

  const toggleDay = (day: number) => {
    setCompletedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        const newCompleted = [...prev, day];
        if (newCompleted.length === 21) {
          setTimeout(() => setShowPrizeModal(true), 500);
        }
        return newCompleted;
      }
    });
  };

  const handleDayClick = (day: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedDay(day);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <img src={logo} alt="easyme" className="w-20 h-20 mx-auto animate-pulse" />
          <p className="text-[#7a9375]">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden relative">
      {/* Decorative organic shapes in background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#a4b8a0] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#c5d4c1] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#b8c9b4] rounded-full blur-3xl" />
      </div>

      {/* Snowflakes decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall text-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <img src={logo} alt="easyme" className="w-16 h-16 drop-shadow-lg" />
      </div>

      <Header completedDays={completedDays.length} />
      <AdventPath 
        completedDays={completedDays} 
        onToggleDay={toggleDay}
        onDayClick={handleDayClick}
      />
      
      <PrizeModal 
        isOpen={showPrizeModal} 
        onClose={() => setShowPrizeModal(false)} 
      />
      
      <TaskModal
        day={selectedDay}
        isCompleted={selectedDay ? completedDays.includes(selectedDay) : false}
        onClose={() => setSelectedDay(null)}
        onToggle={() => {
          if (selectedDay) {
            toggleDay(selectedDay);
          }
        }}
      />
    </div>
  );
}