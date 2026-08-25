import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebaseConfig'

const TASKS_COLLECTION = 'tasks'

// Add a new task for a user
export const addTask = async (userId, taskData) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      userId,
      ...taskData,
      createdAt: new Date().toISOString()
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get all tasks for a user
export const getUserTasks = async (userId) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    const q = query(collection(db, TASKS_COLLECTION), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    const tasks = []
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, tasks }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update a task
export const updateTask = async (taskId, updates) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await updateDoc(taskRef, updates)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete a task
export const deleteTask = async (taskId) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Real-time listener for user tasks
export const subscribeToUserTasks = (userId, callback) => {
  if (!isFirebaseConfigured || !db) {
    // Call callback with empty array to indicate no tasks
    callback([])
    return () => {} // Return empty unsubscribe function
  }
  
  const q = query(collection(db, TASKS_COLLECTION), where('userId', '==', userId))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = []
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    callback(tasks)
  })
  return unsubscribe
}