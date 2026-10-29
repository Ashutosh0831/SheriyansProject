# Projects Workspace

This repository is a collection of independent web application projects. Each
project has its own frontend and backend (where applicable), dependencies, and
local setup. They are not currently connected into one application.

## Projects at a glance

| Project                          | What it does                                                              | Main technologies                                                                      | Current state                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Instagram Clone](./instaclone/) | Social photo-sharing app with account flows, posts, likes, and following. | React, Vite, Sass, Node.js, Express-style API, MongoDB/Mongoose, JWT, Multer, ImageKit | Authentication and several post/follow API routes exist. The post creation UI and feed are still incomplete/not fully connected. |

| [Moodify](./moodify/) | Mood-based music player that uses facial-expression detection to select songs. | React, Vite, MediaPipe Tasks Vision, Sass, Node.js, Express, MongoDB/Mongoose, Redis, JWT, ImageKit | Includes authentication, song APIs, uploads, and camera-based expression detection. See the [Moodify README](./moodify/README.md) for its API and setup details. |

| [Resume Builder](./resume-builder/) | Resume editor with a dashboard, live preview, account flows, and AI-assisted writing. | Next.js, React, TypeScript, Tailwind CSS, MongoDB/Mongoose, bcrypt, JWT, Google Gemini | Core pages and APIs are present. Database and AI features need their environment variables and services configured. |

## Project structure

```text
instaclone/
  backend/       Node.js API and MongoDB models
  frontend/      React/Vite application

moodify/
  backend/       Express API, authentication, songs, storage, and cache
  frontend/      React/Vite player and expression detection UI

resume-builder/  Next.js full-stack application
```

## Getting started

Install dependencies and run each frontend/backend from its own directory.
Keep frontend and backend terminals open separately when both are needed.

### Instagram Clone

Backend:

```sh
cd instaclone/backend
npm install
node server.js
```

The backend listens on `http://localhost:3000`. Its current API prefixes are
`/api/auth`, `/api/post`, and `/api/follow`.

Frontend, in a second terminal:

```sh
cd instaclone/frontend
npm install
npm run dev
```

Vite prints the frontend URL when it starts (normally
`http://localhost:5173`). The backend CORS configuration currently allows that
origin.

### Moodify

Backend:

```sh
cd moodify/backend
npm install
node server.js
```

The backend listens on `http://localhost:5000`.

Frontend, in a second terminal:

```sh
cd moodify/frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). Camera-based
expression detection needs browser camera permission.

### Resume Builder

```sh
cd resume-builder
npm install
npm run dev
```

Open `http://localhost:3000`. The app uses these environment variable names:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign and verify session tokens
- `GEMINI_API_KEY` — Google Gemini API key for AI writing features

Set them in a local environment file such as `.env.local`. Do not commit real
credentials.

## Main app routes and API surfaces

### Instagram Clone

Frontend routes currently defined: `/`, `/login`, and `/register`.

Backend routes:

| Method   | API path                | Purpose                              |
| -------- | ----------------------- | ------------------------------------ |
| `POST`   | `/api/auth/register`    | Register an account                  |
| `POST`   | `/api/auth/login`       | Sign in                              |
| `GET`    | `/api/auth/get-me`      | Get the signed-in user               |
| `POST`   | `/api/post`             | Create a post with an uploaded image |
| `GET`    | `/api/post`             | Get the current user's posts         |
| `GET`    | `/api/post/:postId`     | Get a post                           |
| `POST`   | `/api/post/:postId`     | Like a post                          |
| `POST`   | `/api/follow/:username` | Follow a user                        |
| `DELETE` | `/api/follow/:username` | Unfollow a user                      |

The create-post page/component currently is not registered in the frontend
router, and a complete public feed flow is not yet wired up.

### Moodify

The frontend includes account pages, a home/player experience, and
expression-detection UI. Backend API routes are documented in the
[Moodify README](./moodify/README.md), including `/api/auth` and `/api/songs`.

### Resume Builder

Browser routes: `/auth/login`, `/auth/register`, `/dashboard`, and
`/resumes/[resumeId]/edit`. The root route `/` redirects to sign-in.

API groups:

- `/api/auth/*` — register, login, and logout
- `/api/resumes` and `/api/resumes/*` — list, create, fetch, update, and delete
  the signed-in user's resumes
- `/api/ai/*` — generate or improve resume summaries, skills, project
  descriptions, and work-experience content

## Environment and credentials

Configure local environment variables for the services each app uses. Depending
on the project, these include MongoDB, JWT secrets, Redis, ImageKit, and Gemini
credentials. The Moodify README has its detailed variable list. Never put real
keys, passwords, tokens, or connection strings in source control or public
documentation.

## Development notes

- Start each app from its own directory; package scripts are not centralized at
  the repository root.
- Local port `3000` is used by more than one backend/app, so run those projects
  separately or configure different ports when working on them together.
- The Instagram Clone backend source imports Express, Mongoose, and JWT-related
  modules; compare those imports with its backend package manifest when setting
  up a clean install.
- Some features are partial or not connected end-to-end. Treat the route tables
  as a guide to the current source, not a promise that every flow is production
  ready.
- No shared test command is configured at the workspace root. Check each
  project's `package.json` for its available scripts.
