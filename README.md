# Fullstack React + Express Application

This is a minimal fullstack application that uses Express for the backend and React for the frontend. It is bundled using Webpack. The frontend communicates with the backend via an API.

## Getting Started

### 1. Install Dependencies

To install dependencies for both the client and server, run the following commands:

```bash
# Install npm-run-all globally
npm install npm-run-all -g

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Running the Application

You can run the application in development mode to launch both the client and server concurrently.

```bash
cd ..
npm run dev
```

### 3. Testing the Application

To run tests for both the client and server applications from the root directory, execute the following command:

```bash
npm run test
```

- The **React frontend** will be running at `http://localhost:3001`
- The **Express backend** API will be running at `http://localhost:3000`

The frontend fetches data from the backend API through the `/api/hello` endpoint.

### 4. Building the Client for Production

If you want to build the React app for production, run the following command inside the `client` folder:

```bash
npm run build
```

The bundled files will be available in the `client/dist` folder.

### 5. Running Only the Server

If you'd like to run just the server (without the React frontend), navigate to the `server` directory and start the server:

```bash
cd server
npm run start
```

The server will be available at `http://localhost:3000`.

## File Upload with Workers

This application includes a feature that uses a Web Worker for file uploads. The worker script handles chunk uploads of a file, allowing the upload process to persist even when navigating to other pages. It communicates progress and errors back to the main thread.

### How It Works

1. Files are divided into chunks based on a defined chunk size.
2. Each chunk is uploaded sequentially to the server via the `/uploads/chunk` API endpoint.
3. The worker reports the upload progress back to the main thread.
4. The upload continues even if the user navigates to other pages.
5. Errors during the upload are retried up to a maximum number of attempts.

### Configuration

The chunk size and API URL are defined in the `client/src/config/config.ts` file:

```javascript
export const BASE_API_URL = "http://localhost:3000"; // Backend API base URL
export const CHUNKSIZE = 1024 * 1024; // Chunk size in bytes (1 MB by default)
```

### Using the Worker

The Web Worker is initialized and used in the main thread to handle file uploads. For example:

```javascript
const startUpload = (file: File) => {
  const worker = new TypedWorker();
  setIsUploading(true);

  worker.postMessage({ file });

  worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
    const { type } = event.data;

    if (type === "progress") {
      setProgress(event.data.progress);
    } else if (type === "error") {
      console.error(event.data.error);
      setIsUploading(false);
    } else if (type === "complete") {
      setIsUploading(false);
      setProgress(100);
      console.log("Upload complete");
    }
  };
};
```

### API Endpoint

The server provides the `/uploads/chunk` endpoint to handle chunk uploads. Each chunk is accompanied by metadata, including:

- `fileChunk`: The binary data of the chunk
- `chunkIndex`: The index of the current chunk
- `totalChunks`: The total number of chunks
- `fileId`: A unique identifier for the file

The backend processes each chunk and stores or assembles them as needed.

### Benefits of Using Web Workers

- Ensures uploads are not interrupted when navigating between pages.
- Handles large file uploads efficiently by dividing them into manageable chunks.
- Reports real-time progress, enhancing user experience.

## Folder Overview

- `client`: Contains the React frontend.
- `server`: Contains the Express backend.
- `worker.js`: Implements the file upload logic with chunking and progress reporting.
