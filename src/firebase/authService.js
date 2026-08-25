import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from './firebaseConfig'

// Register a new user
export const register = async (email, password, displayName) => {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase is not configured. Please set up your .env file.' }
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Create user document in Firestore
    if (db) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0],
        createdAt: new Date().toISOString()
      })
    }
    
    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Login existing user
export const login = async (email, password) => {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase is not configured. Please set up your .env file.' }
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Logout current user
export const logout = async () => {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get current user
export const getCurrentUser = () => {
  if (!auth) return null
  return auth.currentUser
}

// Auth state observer
export const onAuthStateChange = (callback) => {
  if (!isFirebaseConfigured || !auth) {
    // Call callback with null to indicate no auth
    callback(null)
    return () => {} // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback)
}

// Get user profile data
export const getUserProfile = async (uid) => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, error: 'Firebase is not configured.' }
  }
  
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}