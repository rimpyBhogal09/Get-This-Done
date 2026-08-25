import { DEFAULT_BACKGROUND } from '../presets'

const BACKGROUND_STORAGE_KEY = 'get-this-done:background'

// Save background preference for a user (using localStorage)
export const saveBackgroundPreference = (userId, backgroundData) => {
  try {
    const key = `${BACKGROUND_STORAGE_KEY}:${userId}`
    localStorage.setItem(key, JSON.stringify(backgroundData))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get background preference for a user (using localStorage)
export const getBackgroundPreference = (userId) => {
  try {
    const key = `${BACKGROUND_STORAGE_KEY}:${userId}`
    const raw = localStorage.getItem(key)
    if (raw) {
      return { success: true, data: JSON.parse(raw) }
    } else {
      return { success: true, data: null } // No preference set yet
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Load background preference for a user (synchronous version for initial load)
export const loadBackgroundPreference = (userId) => {
  try {
    const key = `${BACKGROUND_STORAGE_KEY}:${userId}`
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : DEFAULT_BACKGROUND
  } catch {
    return DEFAULT_BACKGROUND
  }
}