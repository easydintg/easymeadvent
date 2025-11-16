import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS and logging
app.use('*', cors());
app.use('*', logger(console.log));

// Get user progress
app.get('/make-server-0f55acfc/progress/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: 'User ID is required' }, 400);
    }

    const key = `easyme_progress_${userId}`;
    const progress = await kv.get(key);

    if (!progress) {
      // Return empty progress for new users
      return c.json({ 
        completedDays: [],
        lastUpdated: new Date().toISOString()
      });
    }

    return c.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return c.json({ error: 'Failed to fetch progress', details: error.message }, 500);
  }
});

// Save user progress
app.post('/make-server-0f55acfc/progress/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: 'User ID is required' }, 400);
    }

    const body = await c.req.json();
    const { completedDays } = body;

    if (!Array.isArray(completedDays)) {
      return c.json({ error: 'completedDays must be an array' }, 400);
    }

    const key = `easyme_progress_${userId}`;
    const progressData = {
      completedDays,
      lastUpdated: new Date().toISOString(),
    };

    await kv.set(key, progressData);

    return c.json({ 
      success: true, 
      message: 'Progress saved successfully',
      data: progressData
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    return c.json({ error: 'Failed to save progress', details: error.message }, 500);
  }
});

// Get user info (for admin purposes)
app.get('/make-server-0f55acfc/user/:userId/info', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: 'User ID is required' }, 400);
    }

    const key = `easyme_user_${userId}`;
    const userInfo = await kv.get(key);

    return c.json(userInfo || { userId, registered: false });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return c.json({ error: 'Failed to fetch user info', details: error.message }, 500);
  }
});

// Save user info (first time registration)
app.post('/make-server-0f55acfc/user/:userId/register', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: 'User ID is required' }, 400);
    }

    const body = await c.req.json();
    const { firstName, lastName, username } = body;

    const key = `easyme_user_${userId}`;
    const userData = {
      userId,
      firstName,
      lastName,
      username,
      registeredAt: new Date().toISOString(),
    };

    await kv.set(key, userData);

    return c.json({ 
      success: true, 
      message: 'User registered successfully',
      data: userData
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return c.json({ error: 'Failed to register user', details: error.message }, 500);
  }
});

// Health check
app.get('/make-server-0f55acfc/health', (c) => {
  return c.json({ status: 'ok', service: 'easyme-advent-calendar' });
});

Deno.serve(app.fetch);
