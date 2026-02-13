# Job Portal Application

A full-stack Job Portal application built with the MERN stack (MongoDB, Express, React, Node.js) and Redis. This project supports real-time updates and includes a comprehensive job management system.

## Features

- **User Authentication**: Secure signup and login for job seekers and recruiters.
- **Job Management**: Recruiters can post, edit, and delete job listings.
- **Job Search**: Job seekers can search and filter jobs.
- **Real-time Updates**: Real-time notifications and updates using Socket.io.
- **Modern UI**: Responsive design built with React and Tailwind CSS.
- **Redis Integration**: Caching and session management for improved performance.

## Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: NoSQL database for storing user and job data.
- **Redis**: In-memory data store for caching and rate limiting.
- **Socket.io**: Real-time bidirectional event-based communication.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux Toolkit**: State management.
- **Socket.io Client**: Real-time communication client.

## Prerequisites

Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) (Recommended)
- [Node.js](https://nodejs.org/) (If running manually without Docker)

## Getting Started

### Using Docker (Recommended)

The easiest way to run the application is using Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd job_portal
    ```

2.  **Start the services:**
    ```bash
    docker-compose up --build
    ```

    This command will start:
    - MongoDB (Port `27017`)
    - Redis (Port `6379`)
    - Backend (Port `5000`)
    - Frontend (Port `5173`)

3.  **Access the application:**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:5000](http://localhost:5000)

### Manual Setup

If you prefer to run services manually, follow these steps.

#### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory based on the example:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/job_portal
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1d
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

4.  Start the backend server:
    ```bash
    npm run dev
    ```

#### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
job_portal/
├── backend/            # Express backend API
│   ├── src/            # Source code (controllers, models, routes)
│   ├── Dockerfile      # Backend Docker configuration
│   └── package.json    # Backend dependencies
├── frontend/           # React frontend
│   ├── src/            # Source code (components, pages, redux)
│   ├── public/         # Static assets
│   ├── Dockerfile      # Frontend Docker configuration
│   └── vite.config.js  # Vite configuration
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # Project documentation
```

## Environment Variables

| Variable | Description | Default (Docker) |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/job_portal` |
| `JWT_SECRET` | Secret key for JWT signing | `my_super_secure_secret_key_123` |
| `REDIS_HOST` | Redis host address | `jobportal-redis` |
| `REDIS_PORT` | Redis port | `6379` |

## License

This project is licensed under the ISC License.
