import { useState } from 'react'

export default function Navigation({ onOpenBackground }) {
  return (
    <nav className="navigation">
      <div className="nav-profile">
        <div className="profile-avatar">R</div>
        <span className="profile-name">Rimz</span>
      </div>
      <div className="nav-actions">
        <button 
          className="nav-button"
          onClick={onOpenBackground}
          aria-label="Change background"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Background
        </button>
      </div>
    </nav>
  )
}