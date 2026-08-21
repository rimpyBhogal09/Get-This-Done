# Get-This-Done Architecture Diagram

## Project Overview
A React-based todo list application with customizable backgrounds, built with Vite. Tasks and background preferences are persisted in localStorage.

---

## File Structure

```
get-this-done/
├── public/
│   ├── backgrounds/          # Preset background images
│   │   ├── mountains.jpg
│   │   ├── forest.jpg
│   │   ├── ocean.jpg
│   │   ├── night.jpg
│   │   └── desert.jpg
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── BackgroundPicker.jsx  # Background selection UI
│   │   └── TodoList.jsx          # Task management UI
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Global styles
│   ├── main.jsx                 # React entry point
│   └── presets.js               # Background presets & constants
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md
```

---

## Component Hierarchy

```
index.html
    │
    └── <div id="root">
            │
            └── main.jsx (React Entry)
                    │
                    └── <App /> (Main Component)
                            │
                            ├── <BackgroundPicker />
                            │   ├── Preset grid (5 preset images)
                            │   └── URL input form
                            │
                            └── <TodoList />
                                ├── Add task form
                                └── Task list
                                    └── Task items
                                        ├── Checkbox (toggle)
                                        └── Remove button
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser localStorage                      │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │ KEY: 'get-this-done:tasks'│  │ KEY: 'get-this-done:background'│
│  │ VALUE: JSON array of tasks│  │ VALUE: JSON background object│
│  └──────────────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                ▲
                                │ persist on change
                                │
┌─────────────────────────────────────────────────────────────┐
│                        App Component                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ State:                                                  ││
│  │ • tasks: array [{id, text, done}]                      ││
│  │ • background: {type, value}                            ││
│  └─────────────────────────────────────────────────────────┘│
│                           │                                  │
│        ┌──────────────────┼──────────────────┐              │
│        ▼                  ▼                  ▼              │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐           │
│  │addTask()  │    │removeTask()│   │toggleTask()│           │
│  └───────────┘    └───────────┘    └───────────┘           │
└─────────────────────────────────────────────────────────────┘
        │                  │                  │
        │ props            │ props            │ props
        ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      TodoList Component                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Props: tasks, onAdd, onRemove, onToggle                 ││
│  │ State: text (input value)                               ││
│  └─────────────────────────────────────────────────────────┘│
│                           │                                  │
│                           ▼ calls                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ • onAdd(text) - when form submitted                     ││
│  │ • onRemove(id) - when remove button clicked             ││
│  │ • onToggle(id) - when checkbox changed                  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   BackgroundPicker Component                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Props: background, onSelectPreset, onApplyUrl           ││
│  │ State: url (input value)                                ││
│  └─────────────────────────────────────────────────────────┘│
│                           │                                  │
│                           ▼ calls                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ • onSelectPreset(src) - when preset clicked              ││
│  │ • onApplyUrl(url) - when URL form submitted             ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Key Interactions

### 1. Application Initialization
```
index.html → main.jsx → App component
                    ↓
            loadJson() from localStorage
                    ↓
            Initialize state (tasks, background)
```

### 2. Adding a Task
```
User types in TodoList input
    ↓
User submits form
    ↓
TodoList calls onAdd(text)
    ↓
App.addTask() creates new task with crypto.randomUUID()
    ↓
setTasks() updates state
    ↓
useEffect persists to localStorage
    ↓
TodoList re-renders with new task
```

### 3. Toggling Task Completion
```
User clicks checkbox in TodoList
    ↓
TodoList calls onToggle(id)
    ↓
App.toggleTask() flips done boolean
    ↓
setTasks() updates state
    ↓
useEffect persists to localStorage
    ↓
TodoList re-renders with updated task
```

### 4. Removing a Task
```
User clicks remove button in TodoList
    ↓
TodoList calls onRemove(id)
    ↓
App.removeTask() filters out task by id
    ↓
setTasks() updates state
    ↓
useEffect persists to localStorage
    ↓
TodoList re-renders without task
```

### 5. Changing Background (Preset)
```
User clicks preset in BackgroundPicker
    ↓
BackgroundPicker calls onSelectPreset(src)
    ↓
App.setBackground({type: 'preset', value: src})
    ↓
setTasks() updates state
    ↓
useEffect persists to localStorage
    ↓
App re-renders with new background
```

### 6. Changing Background (Custom URL)
```
User enters URL in BackgroundPicker form
    ↓
User submits form
    ↓
BackgroundPicker calls onApplyUrl(url)
    ↓
App.setBackground({type: 'url', value: url})
    ↓
setTasks() updates state
    ↓
useEffect persists to localStorage
    ↓
App re-renders with new background
```

---

## Technology Stack

- **Frontend Framework**: React 19.2.8
- **Build Tool**: Vite 8.2.0
- **Language**: JavaScript (ES modules)
- **Styling**: CSS with CSS custom properties
- **Storage**: Browser localStorage
- **Development**: oxlint for linting

---

## Key Design Patterns

### 1. **State Lifting**
All state is managed in the parent `App` component and passed down via props to child components (`TodoList`, `BackgroundPicker`).

### 2. **Controlled Components**
All form inputs use controlled component pattern with React state:
- TodoList input text
- BackgroundPicker URL input

### 3. **Persistence via useEffect**
Two separate useEffect hooks sync state to localStorage:
- One for tasks
- One for background

### 4. **Prop Drilling for Actions**
Child components receive callback functions to modify parent state:
- `onAdd`, `onRemove`, `onToggle` for TodoList
- `onSelectPreset`, `onApplyUrl` for BackgroundPicker

### 5. **Initialization with Lazy State**
useState uses lazy initialization with `loadJson()` to read from localStorage only on initial render.

---

## Data Structures

### Task Object
```javascript
{
  id: string,        // UUID from crypto.randomUUID()
  text: string,      // Task description
  done: boolean      // Completion status
}
```

### Background Object
```javascript
{
  type: 'preset' | 'url',  // Source type
  value: string            // Image URL or preset path
}
```

### Preset Object
```javascript
{
  id: string,      // Unique identifier
  src: string,     // Image path
  label: string    // Display name
}
```

---

## Build & Development Scripts

- `npm run dev` - Start Vite dev server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run oxlint linter

---

## Styling Architecture

- **Global styles** (`index.css`): CSS custom properties, reset, base styles
- **App styles** (`App.css`): Layout, background image handling, card styling
- **Component styling**: Inline className patterns for component-specific styles
- **Dark theme**: Default dark color scheme with light text