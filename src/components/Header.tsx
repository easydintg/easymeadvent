interface HeaderProps {
  completedDays: number;
}

export function Header({ completedDays }: HeaderProps) {
  const progress = Math.round((completedDays / 21) * 100);

  const motivationalPhrases = [
    "Каждый шаг приближает тебя к цели! 💚",
    "Ты невероятная! Продолжай! ✨",
    "Твоя сила воли впечатляет! 🌟",
    "Ты на правильном пути! 🎯",
    "Гордимся твоей целеустремленностью! 💪"
  ];

  const randomPhrase = motivationalPhrases[Math.floor(completedDays / 5) % motivationalPhrases.length];

  return (
    <div className="relative z-10 px-4 pt-28 pb-6">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="bg-gradient-to-r from-[#7a9375] via-[#a4b8a0] to-[#7a9375] bg-clip-text text-transparent">
          Новогодний марафон стройности
        </h1>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-[#a4b8a0]/20">
          <p className="text-[#5d7559] mb-1">
            Ваш прогресс в марафоне
          </p>
          
          <p className="text-[#7a9375] mb-4">
            {completedDays > 0 ? randomPhrase : "Начни свой путь к новой себе! 🌱"}
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[#5d7559]">
              <span>Выполнено</span>
              <span>{completedDays} / 21 дней</span>
            </div>
            
            <div className="relative h-4 bg-[#e8ede7] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7a9375] via-[#a4b8a0] to-[#7a9375] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            
            <p className="text-[#7a9375]">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
