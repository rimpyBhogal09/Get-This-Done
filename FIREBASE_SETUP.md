# Firebase Setup Guide

This guide will help you set up Firebase for the Get-This-Done application with user authentication and cloud database.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or create a new project
3. Enter a project name (e.g., "get-this-done")
4. Accept the terms and click "Create project"
5. Wait for the project to be created

## Step 2: Enable Authentication

1. In your Firebase project console, go to "Build" → "Authentication"
2. Click "Get Started"
3. Select "Email/Password" sign-in method
4. Enable it and click "Save"

## Step 3: Set up Firestore Database

1. Go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose a location (preferably close to your users)
4. Select "Start in test mode" (for development)
5. Click "Enable"

## Step 4: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Give it a name (e.g., "Get-This-Done")
5. Copy the firebaseConfig object

## Step 5: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Replace the placeholder values in `.env` with your actual Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Step 6: Update Firestore Security Rules

For development, you can use these permissive rules (update for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 7: Run the Application

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the local development URL

## Step 8: Test the Application

1. You should see a login/register page
2. Register a new account with email and password
3. After successful registration, you'll be redirected to the main app
4. Try adding tasks - they should be saved to Firestore
5. Try changing backgrounds - your preference should be saved locally
6. Logout and login again - your tasks should persist from Firebase, backgrounds from localStorage

## Important Notes

- The `.env` file contains sensitive information and should never be committed to git
- For production, tighten the security rules
- Consider implementing additional authentication methods
- The Firebase free tier has generous limits for small applications
- Background images are stored locally in the browser (localStorage), not in Firebase
- Tasks are stored in Firebase Firestore for cloud sync across devices

## Troubleshooting

**"Firebase: No Firebase App '[DEFAULT]' has been created"**
- Make sure your `.env` file is properly configured
- Restart the development server after creating the `.env` file

**"Permission denied" errors**
- Check your Firestore security rules
- Make sure authentication is working properly

**"auth/api-key-not-valid" error**
- Verify your Firebase API key in the `.env` file
- Make sure you copied the correct configuration from Firebase Console
- Restart the development server after updating the `.env` file