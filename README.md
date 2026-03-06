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

## Local Setup

### Backend

```bash
cd server
npm install
```

Create `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickhire
ADMIN_KEY=supersecret
```

Run it:
```bash
node src/seed.js
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_KEY=supersecret
```

Run it:
```bash
npm run dev
```

## Deploy to Vercel

### 1. Setup MongoDB Atlas

- Go to mongodb.com/cloud/atlas
- Create free cluster
- Database Access → Add user with password
- Network Access → Add IP `0.0.0.0/0`
- Get connection string

### 2. Deploy Backend

```bash
cd server
vercel
```

Or via Vercel dashboard:
- New Project → Import your repo
- Root Directory: `server`
- Framework Preset: Other
- Build Command: (leave empty)
- Output Directory: (leave empty)

Add environment variables:
- `MONGO_URI` - your MongoDB Atlas connection string
- `ADMIN_KEY` - your admin password
- `PORT` - 10000

Copy your backend URL (e.g., `https://your-backend.vercel.app`)

### 3. Deploy Frontend

```bash
cd client
vercel
```

Or via dashboard:
- New Project → Import your repo
- Root Directory: `client`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Add environment variables:
- `VITE_API_BASE_URL` - your backend URL from step 2
- `VITE_ADMIN_KEY` - same as backend

### 4. Seed Database

After backend is deployed, run locally:
```bash
cd server
# Update .env with production MONGO_URI
node src/seed.js
```

Done! Your app is live.

## Admin Access

Go to `/login` and enter your admin key to manage jobs and view applications.

## API Endpoints

**Jobs**
- `GET /api/jobs` - list jobs
- `GET /api/jobs/:id` - get one job
- `POST /api/jobs` - create (admin)
- `DELETE /api/jobs/:id` - delete (admin)

**Applications**
- `GET /api/applications` - list all (admin)
- `POST /api/applications` - submit application
- `DELETE /api/applications/:id` - delete (admin)

## Notes

- URL validation simplified for Google Drive links
- Applications save with try-catch for MongoDB reliability
- 36 sample jobs in seed script

## Troubleshooting

**MongoDB connection fails:**
- Check IP whitelist includes 0.0.0.0/0
- Verify password in connection string
- Add `/quickhire` database name to connection string

**CORS errors:**
- Update backend CORS to include frontend URL
- Check environment variables are set correctly

**Vercel timeout:**
- Vercel free tier has 10s function timeout
- Database operations should complete within this
