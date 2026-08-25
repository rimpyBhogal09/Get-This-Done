# Get-This-Done

A user-specific to-do list application with authentication and cloud database. Features customizable backgrounds, task management, and real-time sync across devices.

## Features

- **User Authentication**: Secure login/register with email and password
- **Cloud Database**: Tasks synced to Firebase Firestore for cross-device access
- **User-Specific Data**: Each user has their own tasks and background preferences
- **Custom Backgrounds**: Choose from presets or use image URLs
- **Local Background Storage**: Background preferences stored locally in browser
- **Real-time Sync**: Tasks sync instantly across devices via Firebase

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Follow the setup guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Copy `.env.example` to `.env` and add your Firebase credentials

3. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage

1. Open the app and register a new account
2. Add tasks to your personal todo list (synced to cloud)
3. Customize your background with presets or image URLs (stored locally)
4. Your tasks sync automatically to Firebase across devices
5. Logout and login from any device to access your tasks

## Technology Stack

- **Frontend**: React 19 + Vite
- **Backend**: Firebase (Auth, Firestore)
- **Authentication**: Firebase Auth (Email/Password)
- **Database**: Firebase Firestore (for tasks)
- **Local Storage**: Browser localStorage (for background preferences)

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linter
```
