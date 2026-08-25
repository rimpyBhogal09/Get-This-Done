import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import BackgroundModal from './components/BackgroundModal'
import TodoList from './components/TodoList'
import Auth from './components/Auth'
import { DEFAULT_BACKGROUND } from './presets'
import { onAuthStateChange, logout, getUserProfile } from './firebase/authService'
import { subscribeToUserTasks, addTask as addTaskToDb, updateTask, deleteTask as deleteTaskFromDb } from './firebase/taskService'
import { saveBackgroundPreference, loadBackgroundPreference } from './firebase/backgroundService'
import { isFirebaseConfigured } from './firebase/firebaseConfig'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [tasks, setTasks] = useState([])
  const [background, setBackground] = useState(DEFAULT_BACKGROUND)
  const [showBackgroundModal, setShowBackgroundModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser)
        // Fetch user profile
        const profileResult = await getUserProfile(authUser.uid)
        if (profileResult.success) {
          setUserProfile(profileResult.data)
        }
        // Load user's background preference from localStorage
        const userBackground = loadBackgroundPreference(authUser.uid)
        setBackground(userBackground)
      } else {
        setUser(null)
        setUserProfile(null)
        setTasks([])
        setBackground(DEFAULT_BACKGROUND)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Subscribe to tasks when user is authenticated
  useEffect(() => {
    if (!user) return

    const unsubscribe = subscribeToUserTasks(user.uid, (tasksData) => {
      setTasks(tasksData)
    })

    return () => unsubscribe()
  }, [user])

  async function addTask(text) {
    if (!user) return
    await addTaskToDb(user.uid, {
      text,
      done: false
    })
  }

  async function removeTask(id) {
    if (!user) return
    await deleteTaskFromDb(id)
  }

  async function toggleTask(id) {
    if (!user) return
    const task = tasks.find(t => t.id === id)
    if (task) {
      await updateTask(id, { done: !task.done })
    }
  }

  function handleBackgroundChange(newBackground) {
    if (!user) return
    setBackground(newBackground)
    saveBackgroundPreference(user.uid, newBackground)
  }

  async function handleLogout() {
    await logout()
  }

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Configuration Required</h1>
            <p>Firebase is not configured. Please set up your environment variables.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
            <p><strong>To fix this:</strong></p>
            <ol style={{ textAlign: 'left', margin: '20px 0', paddingLeft: '20px' }}>
              <li>Copy <code>.env.example</code> to <code>.env</code></li>
              <li>Add your Firebase credentials to <code>.env</code></li>
              <li>Restart the development server</li>
            </ol>
            <p style={{ fontSize: '0.8rem', color: 'rgba(232, 234, 239, 0.6)' }}>
              See <code>FIREBASE_SETUP.md</code> for detailed instructions
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth onAuthSuccess={(authUser) => setUser(authUser)} />
  }

  const imageUrl = background.value
  const displayName = userProfile?.displayName || user.email?.split('@')[0] || 'User'

  return (
    <div
      className="app"
      style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined }}
    >
      <div className="overlay">
        <Navigation 
          userName={displayName}
          userAvatar={displayName.charAt(0).toUpperCase()}
          onOpenBackground={() => setShowBackgroundModal(true)}
          onLogout={handleLogout}
        />
        <main className="card">
          <h1>Hello {displayName}, Let's get this done:</h1>
          <TodoList
            tasks={tasks}
            onAdd={addTask}
            onRemove={removeTask}
            onToggle={toggleTask}
          />
        </main>
        {showBackgroundModal && (
          <BackgroundModal
            background={background}
            onSelectPreset={(src) => handleBackgroundChange({ type: 'preset', value: src })}
            onApplyUrl={(url) => handleBackgroundChange({ type: 'url', value: url })}
            onClose={() => setShowBackgroundModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
