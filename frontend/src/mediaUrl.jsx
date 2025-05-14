export const MEDIA_BASE_URL = "https://funreadbackend.ticocr.org";

export function getMediaUrl(path) {
  if (path && path.startsWith("/Media/media/")) {
    return MEDIA_BASE_URL + path;
  }
  return path;
}
