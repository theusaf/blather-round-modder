# Development

This document outlines the steps to run and develop the Blather Round Editor application locally.

## Requirements

- [Node.js](https://nodejs.org/)
- A [Firebase](https://firebase.google.com/) Firestore database

## Environment Variables

This application requires the following environment variables to work properly:

- `SESSION_SECRET` - A secret key used to sign session cookies.
- `FIREBASE_CREDENTIALS` - A JSON object containing the admin credentials for your Firebase project.

In Next.JS, you can place these variables in the `.env.local` file.

## Running the Application

1. Clone the repository and navigate to the project directory.
2. Install the project dependencies by running `npm install`.
3. Start the development server by running `npm run dev`.
