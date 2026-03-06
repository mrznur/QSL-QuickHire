# QuickHire - Job Board Platform

A modern job board application built with React, Node.js, Express, and MongoDB. QuickHire allows users to browse jobs, apply for positions, and provides an admin dashboard for managing job listings and applications.

## Features

- Browse featured and latest job listings
- Search and filter jobs by title, company, category, and location
- View detailed job descriptions
- Apply for jobs with resume and cover letter
- Admin dashboard for managing jobs and applications
- Responsive design for mobile and desktop

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS + DaisyUI for styling
- Axios for API calls

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- CORS enabled for cross-origin requests

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/mrznur/QSL-QuickHire.git
cd QSL-QuickHire
```

2. Install backend dependencies:
```bash
cd quickhire/server
npm install
```

3. Create backend `.env` file:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_KEY=supersecret
```

4. Seed the database:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

6. Install frontend dependencies (in a new terminal):
```bash
cd quickhire/client
npm install
```

7. Create frontend `.env` file:
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_KEY=supersecret
```

8. Start the frontend:
```bash
npm run dev
```

The app will be running at `http://localhost:5173`

## Deployment

### Backend (Vercel)

1. Create a new Vercel project
2. Set Root Directory to `quickhire/server`
3. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `ADMIN_KEY` - Admin authentication key
4. Deploy

### Frontend (Vercel)

1. Create a new Vercel project
2. Set Root Directory to `quickhire/client`
3. Add environment variables:
   - `VITE_API_BASE_URL` - Your backend URL
   - `VITE_ADMIN_KEY` - Admin authentication key
4. Deploy

### MongoDB Atlas Setup

1. Create a cluster on MongoDB Atlas
2. Go to Network Access
3. Add IP address `0.0.0.0/0` to allow connections from anywhere
4. Get your connection string and add it to environment variables

## Admin Access

- Email: `admin@quickhire.com`
- Password: `supersecret`

Login at `/login` to access the admin dashboard at `/admin`

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs (supports search, category, location filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get all applications (admin only)
- `DELETE /api/applications/:id` - Delete application (admin only)

## Project Structure

```
quickhire/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── ...
└── server/                # Backend Express app
    ├── src/
    │   ├── config/        # Database configuration
    │   ├── middleware/    # Express middleware
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   └── app.js         # Express app setup
    └── ...
```

## License

MIT

## Author

Developed by [mrznur](https://github.com/mrznur)
