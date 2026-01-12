# GigFlow

GigFlow is a gig marketplace platform connecting freelancers with clients. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB

## Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB installed locally or a Cloud Atlas URI

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd GigFlow
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with:
    # PORT=5000
    # MONGODB_URI=your_mongodb_uri
    # JWT_SECRET=your_jwt_secret
    # CLIENT_URL=http://localhost:5173
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    # Create .env file with:
    # VITE_API_URL=http://localhost:5000/api/auth
    npm run dev
    ```

## Deployment

### Backend (Render)
- Connect repo to Render.
- Root directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Env Vars:
    - `MONGODB_URI`: Your connection string
    - `JWT_SECRET`: Your secret key
    - `CLIENT_URL`: Your Netlify URL (e.g., `https://gigflow.netlify.app`)
    - `NODE_ENV`: `production`

### Frontend (Netlify)
- Connect repo to Netlify.
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Env Vars:
    - `VITE_API_URL`: Your Render Backend URL + `/api/auth` (e.g., `https://gigflow.onrender.com/api/auth`)
