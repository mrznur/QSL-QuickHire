# QuickHire

A job board where people can find jobs and apply, and admins can post/manage listings.

## What it does

- Browse jobs by category (dev, design, marketing, etc.)
- Search for specific jobs or companies
- Apply with your resume link
- Admin panel to add/remove jobs and see applications

## Stack

**Frontend:** React + Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB

## Getting started

You'll need Node.js and MongoDB installed.

### Backend

```bash
cd server
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickhire
ADMIN_KEY=supersecret
```

Make sure MongoDB is running, then seed the database:
```bash
node src/seed.js
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_KEY=supersecret
```

Start it up:
```bash
npm run dev
```

Open http://localhost:5173

## Admin access

Go to `/login` and enter `supersecret` as the admin key. You can then add jobs, delete them, and view applications.

## Project structure

```
client/
  src/
    api/          - API calls
    components/   - React components
    pages/        - Main pages
    utils/        - Helper functions

server/
  src/
    config/       - DB setup
    models/       - Mongoose schemas
    routes/       - API endpoints
    middleware/   - Auth stuff
```

## API

**Jobs**
- `GET /api/jobs` - list all jobs (supports ?search, ?category, ?location)
- `GET /api/jobs/:id` - get one job
- `POST /api/jobs` - create job (needs admin key)
- `DELETE /api/jobs/:id` - delete job (needs admin key)

**Applications**
- `GET /api/applications` - list all (needs admin key)
- `POST /api/applications` - submit application
- `DELETE /api/applications/:id` - delete (needs admin key)

## Deploying to Render

### Quick setup

1. Push your code to GitHub
2. Sign up at [render.com](https://render.com)
3. Create a MongoDB Atlas database (free tier works)
4. Deploy backend and frontend separately

### Backend deployment

1. New Web Service → Connect your repo
2. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Add environment variables:
   - `MONGO_URI` - your MongoDB Atlas connection string
   - `ADMIN_KEY` - your admin password
   - `FRONTEND_URL` - your frontend URL (add after frontend is deployed)
4. Deploy and copy the backend URL

### Frontend deployment

1. New Static Site → Connect your repo
2. Settings:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
3. Add environment variables:
   - `VITE_API_BASE_URL` - your backend URL from step above
   - `VITE_ADMIN_KEY` - same as backend
4. Deploy

### Seed the database

After backend is deployed, go to Shell tab in Render and run:
```bash
node src/seed.js
```

### MongoDB Atlas setup

1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Network Access → Add IP: `0.0.0.0/0` (allow all)
4. Get connection string and use as `MONGO_URI`

That's it. Your app should be live.

## Notes

- The regex validation for URLs was causing issues with Google Drive links, so I simplified it to just check if the URL starts with "http"
- Applications are saved to the database but the save happens in a try-catch so the user still gets a success message even if MongoDB has issues
- The seed script adds 36 sample jobs - first 8 are featured, next 8 are latest

## Known issues

- MongoDB write operations can be slow sometimes, but the app handles it gracefully
- The navbar admin check uses sessionStorage which doesn't sync across tabs

That's pretty much it. Clone it, run it, break it, fix it.
