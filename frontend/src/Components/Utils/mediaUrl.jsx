import { BASE_URL } from "../../settings";

export const MEDIA_BASE_URL = BASE_URL;

export function getMediaUrl(path) {
  if (!path) return path;
  // If path is already a data URL or blob URL, return as-is
  if (typeof path === 'string' && (path.startsWith('data:') || path.startsWith('blob:'))) {
    return path;
  }
  
  // Handle old /Media/media/ format
  if (path.startsWith("/Media/media/")) {
    // Convert to new /api/media/ format
    return MEDIA_BASE_URL + "media/" + path.substring("/Media/media/".length);
  }
  
  // Handle paths that already start with /api/media/
  if (path.startsWith("/api/media/")) {
    return MEDIA_BASE_URL + path.substring("/api/".length);
  }
  
  // Handle paths that start with /media/ (add api prefix)
  if (path.startsWith("/media/")) {
    return MEDIA_BASE_URL + path.substring(1);
  }
  
  // Handle relative paths (no leading slash)
  if (!path.startsWith("/") && !path.startsWith("http")) {
    return MEDIA_BASE_URL + "media/" + path;
  }
  
  return path;
}
