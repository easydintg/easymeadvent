import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0f55acfc`;

interface UserProgress {
  userId: string;
  firstName?: string;
  completedDays: number[];
  lastUpdated: string;
}

export function AdminPanel() {
  const [users, setUsers] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadAllUsers = async () => {
    setIsLoading(true);
    try {
      // Здесь можно добавить запрос на получение всех пользователей
      // Для этого нужно создать отдельный endpoint в сервере
      console.log('Загрузка списка пользователей...');
      // const response = await fetch(`${API_URL}/admin/users`, {...});
      // const data = await response.json();
      // setUsers(data);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
    setIsLoading(false);
  };

  const exportData = () => {
    const csv = users.map(u => 
      `${u.userId},${u.firstName || 'N/A'},${u.completedDays.length},${u.lastUpdated}`
    ).join('\n');
    
    const blob = new Blob([`UserId,Name,DaysCompleted,LastUpdated\n${csv}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `easyme-marathon-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredUsers = users.filter(u => 
    u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.userId.includes(searchTerm)
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Кнопка для открытия админки */}
      <button
        onClick={loadAllUsers}
        className="px-4 py-2 bg-[#7a9375] text-white rounded-lg shadow-lg hover:bg-[#5d7559] transition-colors"
      >
        📊 Админ панель
      </button>

      {/* Модальное окно с данными */}
      {users.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#5d7559]">
                Статистика марафона
              </h2>
              <button
                onClick={() => setUsers([])}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-4">
              {/* Поиск */}
              <input
                type="text"
                placeholder="Поиск по имени или ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#e8ede7] rounded-lg"
              />

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f0f4ef] p-4 rounded-lg text-center">
                  <p className="text-[#7a9375]">Всего участников</p>
                  <p className="text-[#5d7559]">{users.length}</p>
                </div>
                <div className="bg-[#f0f4ef] p-4 rounded-lg text-center">
                  <p className="text-[#7a9375]">Завершили</p>
                  <p className="text-[#5d7559]">
                    {users.filter(u => u.completedDays.length === 21).length}
                  </p>
                </div>
                <div className="bg-[#f0f4ef] p-4 rounded-lg text-center">
                  <p className="text-[#7a9375]">Средний прогресс</p>
                  <p className="text-[#5d7559]">
                    {Math.round(users.reduce((acc, u) => acc + u.completedDays.length, 0) / users.length)} дней
                  </p>
                </div>
              </div>

              {/* Кнопка экспорта */}
              <button
                onClick={exportData}
                className="px-4 py-2 bg-[#7a9375] text-white rounded-lg hover:bg-[#5d7559]"
              >
                📥 Экспортировать в CSV
              </button>

              {/* Список пользователей */}
              <div className="space-y-2 max-h-96 overflow-auto">
                {filteredUsers.map(user => (
                  <div
                    key={user.userId}
                    className="flex justify-between items-center p-3 bg-[#f0f4ef] rounded-lg"
                  >
                    <div>
                      <p className="text-[#5d7559]">
                        {user.firstName || 'User ' + user.userId}
                      </p>
                      <p className="text-[#7a9375]">
                        ID: {user.userId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#5d7559]">
                        {user.completedDays.length} / 21
                      </p>
                      <p className="text-[#7a9375]">
                        {new Date(user.lastUpdated).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
