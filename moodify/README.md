# Moodify

Moodify is a mood-based music player. It detects a facial expression, loads songs for the detected mood, and lets the user play a selected song in the built-in player.

## Features

- User registration and login
- Facial mood detection with MediaPipe
- Mood categories: `happy`, `sad`, and `surprised`
- Neutral mood returns songs from all moods
- Random song selection from MongoDB for the detected mood
- Clickable song list connected to the music player
- Song and poster uploads through ImageKit

## Project Structure

```text
moodify/
├── backend/
│   ├── config/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── models/
│   ├── router/
│   ├── services/
│   └── server.js
├── frontend/
│   └── src/
└── README.md
```

## Requirements

- Node.js 18 or newer
- MongoDB
- Redis
- An ImageKit account and private key
- A browser with camera access

## Backend Setup

Open a terminal in `moodify/backend` and install dependencies:

```bash
npm install
```

Create a `.env` file in `moodify/backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend:

```bash
node server.js
```

The API runs at `http://localhost:5000`.

## Frontend Setup

Open another terminal in `moodify/frontend` and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

Other useful commands:

```bash
npm run build
npm run lint
npm run preview
```

## API Routes

| Method | Route                         | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| `POST` | `/api/auth/register`          | Register a user                |
| `POST` | `/api/auth/login`             | Log in a user                  |
| `POST` | `/api/songs`                  | Upload a song with its mood    |
| `GET`  | `/api/songs?mood=happy`       | Get one random song for a mood |
| `GET`  | `/api/songs/all?mood=happy`   | Get all songs for a mood       |
| `GET`  | `/api/songs/all?mood=neutral` | Get all songs                  |

## Mood Song Flow

1. The frontend detects a facial expression.
2. It sends the mood to the backend.
3. MongoDB filters songs by `mood`.
4. MongoDB randomly selects a matching song.
5. The frontend updates the song list and player.
6. Neutral mood uses no mood filter and returns songs from all moods.

## Uploading Songs

When uploading a song, include the mood as one of the supported values:

```text
happy
sad
surprised
```

The backend reads the song metadata, uploads the audio and poster to ImageKit, and stores the resulting URLs and mood in MongoDB.

## Notes

- Keep `.env` out of version control.
- Camera permission is required for facial mood detection.
- Start MongoDB and Redis before starting the backend.
- The frontend currently expects the backend at `http://localhost:5000`.
