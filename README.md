# NVR MVP

## Getting Started

### Prerequisites

- Node.js (version 14.x or above)
- npm or yarn package manager

### Installation

1.  Clone the repository and navigate into the project directory.

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  Install the dependencies.

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm
    ```

3.  Navigate to the rtsp_backend folder and install dependencies for the backend.

        ```bash
        cd rtsp_backend
        npm install
        # or
        yarn
        # or
        pnpm
        ```

4.  Create a .env file in the root directory and copy the values from env.example.

    ```bash
    NEXT_PUBLIC_API_URL=https://723cd6fa68c1a0c386448fccd88c6c2b.serveo.net
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```

## Constants

The following constants are used in the project and can be found in /lib/constants.js

    ```bash
    export const disableMovementTimeout = 3000;
    export const blinkingTimeout = 5000;
    ```

## Running the project

### Development

To run both the frontend and backend in development mode, use the following command:

    ```bash
    npm run both-dev
    ```

This will:

- Start the frontend on http://localhost:3000
- Start the backend on http://localhost:8000

### Production Mode

To build and run both the frontend and backend in production mode, use the following commands:

1.  Build the Next.js project:
    `bash
    npm run build
    `
2.  Start both the frontend and backend:

        ```bash
        npm run both-prod
        ```

## Available Scripts

In the package.json, the following scripts are available:

    ```bash
    {

"scripts": {
"both-dev": "concurrently \"npm run dev\" \"npm run backend\"",
"both-prod": "concurrently \"npm run start\" \"npm run backend\"",
"backend": "cd rtsp_backend && npm start",
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
}
}

```

- npm run both-dev: Runs both the frontend and backend in development mode.
- npm run both-prod: Builds and runs both the frontend and backend in production mode.
- npm run dev: Runs the frontend in development mode.
- npm run build: Builds the frontend for production.
- npm run start: Starts the frontend in production mode.
- npm run backend: Runs the backend in development mode.

```
