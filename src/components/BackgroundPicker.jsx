import { useState } from 'react'
import { BACKGROUND_PRESETS } from '../presets'

export default function BackgroundPicker({ background, onSelectPreset, onApplyUrl }) {
  const [url, setUrl] = useState(background.type === 'url' ? background.value : '')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    onApplyUrl(trimmed)
  }

  return (
    <section className="background-picker" aria-labelledby="bg-heading">
      <h2 id="bg-heading">Background</h2>
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
    </section>
  )
}
