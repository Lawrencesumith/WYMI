import subprocess
import http.server
import socketserver
import webbrowser
import os
import time
import threading
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define ports
BACKEND_PORT = 8000
FRONTEND_PORT = 8080

# Path to backend script and frontend file
BACKEND_SCRIPT = "recommendation_api_fastapi.py"
FRONTEND_FILE = "index.html"

def start_backend():
    """Start the FastAPI backend using uvicorn in a subprocess."""
    try:
        logger.info(f"Starting FastAPI backend on port {BACKEND_PORT}...")
        process = subprocess.Popen(
            ["uvicorn", "recommendation_api_fastapi:app", "--host", "0.0.0.0", "--port", str(BACKEND_PORT)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        # Wait briefly to ensure the server starts
        time.sleep(2)
        # Check if the process is still running
        if process.poll() is not None:
            stderr = process.stderr.read()
            logger.error(f"Backend failed to start: {stderr}")
            return None
        logger.info(f"Backend running on http://localhost:{BACKEND_PORT}")
        return process
    except Exception as e:
        logger.error(f"Error starting backend: {e}")
        return None

def start_frontend():
    """Start a simple HTTP server to serve the frontend."""
    try:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))  # Ensure we're in the right directory
        Handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", FRONTEND_PORT), Handler) as httpd:
            logger.info(f"Serving frontend on http://localhost:{FRONTEND_PORT}")
            webbrowser.open(f"http://localhost:{FRONTEND_PORT}/{FRONTEND_FILE}")
            httpd.serve_forever()
    except Exception as e:
        logger.error(f"Error starting frontend server: {e}")

def main():
    """Main function to start both backend and frontend."""
    if not os.path.exists(BACKEND_SCRIPT):
        logger.error(f"Backend script {BACKEND_SCRIPT} not found")
        return
    if not os.path.exists(FRONTEND_FILE):
        logger.error(f"Frontend file {FRONTEND_FILE} not found")
        return

    # Start backend in a separate thread
    backend_process = start_backend()
    if backend_process is None:
        logger.error("Cannot proceed without backend")
        return

    # Start frontend in the main thread
    frontend_thread = threading.Thread(target=start_frontend, daemon=True)
    frontend_thread.start()

    try:
        # Keep the script running and monitor backend
        while True:
            if backend_process.poll() is not None:
                logger.error("Backend process terminated unexpectedly")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Shutting down...")
        backend_process.terminate()
        backend_process.wait()

if __name__ == "__main__":
    main()