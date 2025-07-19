export const BASE_URL = "http://localhost:8000/api/";

// Helper function to build URLs correctly, avoiding double slashes
export const buildUrl = (path) => {
  if (path.startsWith('/')) {
    return BASE_URL + path.substring(1);
  }
  return BASE_URL + path;
};
