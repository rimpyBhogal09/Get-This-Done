import { useState } from 'react'

export default function Navigation({ userName, userAvatar, onOpenBackground, onLogout }) {
  return (
    <nav className="navigation">
      <div className="nav-profile">
        <div className="profile-avatar">{userAvatar}</div>
        <span className="profile-name">{userName}</span>
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
        <button 
          className="nav-button logout"
          onClick={onLogout}
          aria-label="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </nav>
  )
}