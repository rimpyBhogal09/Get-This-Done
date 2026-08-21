import { useState } from 'react'
import { BACKGROUND_PRESETS } from '../presets'

export default function BackgroundModal({ background, onSelectPreset, onApplyUrl, onClose }) {
  const [url, setUrl] = useState(background.type === 'url' ? background.value : '')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    onApplyUrl(trimmed)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choose Background</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="preset-grid">
            {BACKGROUND_PRESETS.map((preset) => {
              const selected = background.type === 'preset' && background.value === preset.src
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={selected ? 'preset selected' : 'preset'}
                  onClick={() => onSelectPreset(preset.src)}
                  aria-pressed={selected}
                  aria-label={preset.label}
                >
                  <img src={preset.src} alt="" />
                  <span>{preset.label}</span>
                </button>
              )
            })}
          </div>
          <form className="url-form" onSubmit={handleSubmit}>
            <label htmlFor="bg-url">From the web</label>
            <div className="url-row">
              <input
                id="bg-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
              <button type="submit">Apply</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}