import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import BackgroundModal from './components/BackgroundModal'
import TodoList from './components/TodoList'
import {
  BACKGROUND_KEY,
  DEFAULT_BACKGROUND,
  TASKS_KEY,
} from './presets'
import './App.css'

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [tasks, setTasks] = useState(() => loadJson(TASKS_KEY, []))
  const [background, setBackground] = useState(() =>
    loadJson(BACKGROUND_KEY, DEFAULT_BACKGROUND),
  )
  const [showBackgroundModal, setShowBackgroundModal] = useState(false)

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(BACKGROUND_KEY, JSON.stringify(background))
  }, [background])

  function addTask(text) {
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), text, done: false },
    ])
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const imageUrl = background.value

  return (
    <div
      className="app"
      style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined }}
    >
      <div className="overlay">
        <Navigation onOpenBackground={() => setShowBackgroundModal(true)} />
        <main className="card">
          <h1>Hello Rimz, Lets get this done :</h1>
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
            onSelectPreset={(src) => setBackground({ type: 'preset', value: src })}
            onApplyUrl={(url) => setBackground({ type: 'url', value: url })}
            onClose={() => setShowBackgroundModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
