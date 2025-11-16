import { projectId, publicAnonKey } from './supabase/info.tsx';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0f55acfc`;

interface ProgressData {
  completedDays: number[];
  lastUpdated: string;
}

// Get user progress from server
export const getProgress = async (userId: string): Promise<number[]> => {
  try {
    const response = await fetch(`${API_URL}/progress/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch progress:', response.status, response.statusText);
      return [];
    }

    const data: ProgressData = await response.json();
    return data.completedDays || [];
  } catch (error) {
    console.error('Error fetching progress from server:', error);
    return [];
  }
};

// Save user progress to server
export const saveProgress = async (userId: string, completedDays: number[]): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/progress/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completedDays }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to save progress:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Progress saved successfully:', result);
    return true;
  } catch (error) {
    console.error('Error saving progress to server:', error);
    return false;
  }
};

// Register user (first time)
export const registerUser = async (
  userId: string,
  firstName: string,
  lastName?: string,
  username?: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, username }),
    });

    if (!response.ok) {
      console.error('Failed to register user:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};
