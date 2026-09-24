# Moodify

Moodify is a mood-based music player that uses facial-expression detection to recommend songs. The frontend detects a user's expression with the camera and requests songs for the detected mood from the backend.

## Features

- Register, log in, and log out with cookie-based authentication
- Detect `happy`, `sad`, and `surprised` expressions using the webcam
- Fetch a random song for a detected mood
- Browse all songs or filter songs by mood
- Upload songs with ID3 metadata and cover art
- Store song files and posters with ImageKit
- Use Redis to track logged-out tokens

## Project Structure

```text
moodify/
├── backend/     # Express API, authentication, song management, database access
└── frontend/    # React/Vite application and facial-expression detection UI
```

## Requirements

- Node.js and npm
- MongoDB
- Redis
- An ImageKit account for song and poster storage
- A browser with webcam support for expression detection

## Environment Variables

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/moodify
JWT_TOKEN=replace-with-a-long-random-secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
NODE_ENV=development
```

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Do not commit either `.env` file or any private keys.

## Installation

Install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

Start the backend in one terminal:

```bash
cd backend
node server.js
```

The API runs on `http://localhost:5000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Allow camera access when using expression detection.

## Frontend Scripts

Run these commands from `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

The backend currently has no start script, so run it with `node server.js` from `backend/`.

## API Routes

All routes are served from the backend URL.

| Method | Route                     | Description                                  | Authentication  |
| ------ | ------------------------- | -------------------------------------------- | --------------- |
| `POST` | `/api/auth/register`      | Create an account                            | No              |
| `POST` | `/api/auth/login`         | Log in with a username or email              | No              |
| `GET`  | `/api/auth/get-user`      | Get the current user                         | Cookie required |
| `POST` | `/api/auth/logout`        | Log out and invalidate the session token     | Cookie required |
| `GET`  | `/api/songs?mood=happy`   | Fetch one random song for a mood             | Cookie required |
| `GET`  | `/api/songs/all?mood=sad` | Fetch all songs, optionally filtered by mood | Cookie required |
| `POST` | `/api/songs`              | Upload a song and its ID3 cover art          | No              |

Supported song moods are `sad`, `happy`, and `surprised`. A neutral mood returns songs without applying a mood filter.

## Notes

- Authentication uses an HTTP-only `token` cookie, so the frontend sends requests with credentials enabled.
- The webcam and MediaPipe model are initialized on the home page. Expression detection requires HTTPS in production or `localhost` during development.
- The backend accepts song uploads up to 10 MB.
