import { BASE_URL } from "../../settings";

export const MEDIA_BASE_URL = BASE_URL;

export function getMediaUrl(path) {
  if (path && path.startsWith("/Media/media/")) {
    return MEDIA_BASE_URL + path;
  }
  return path;
}
