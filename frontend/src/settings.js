export const BASE_URL = "http://localhost:8000/api/";

// Helper function to build URLs correctly, avoiding double slashes
export const buildUrl = (path) => {
  if (path.startsWith('/')) {
    return BASE_URL + path.substring(1);
  }
  return BASE_URL + path;
};

// Path to the login route in the SPA. Set to '/' to redirect to root instead of a dedicated login page.
// You can override via environment variables or change here to the actual login path if present.
export const LOGIN_PATH = '/';
