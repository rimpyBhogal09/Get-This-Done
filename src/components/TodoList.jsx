import { useState } from 'react'

export default function TodoList({ tasks, onAdd, onRemove, onToggle }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <section className="todo" aria-labelledby="todo-heading">
      <h2 id="todo-heading">Tasks</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="new-task">
          New task
        </label>
        <input
          id="new-task"
          type="text"
          placeholder="Add a task…"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {tasks.length === 0 ? (
        <p className="empty">Nothing here yet. Add a task to get started.</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggle(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button
                type="button"
                className="remove"
                onClick={() => onRemove(task.id)}
                aria-label={`Remove ${task.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
