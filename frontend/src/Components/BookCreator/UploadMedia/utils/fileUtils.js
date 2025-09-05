export const MIME_MAP = {
  image: ['image/*'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  audio: ['audio/*'],
  video: ['video/*'],
};

export function fileAcceptString(types = ['image']) {
  const arr = types.flatMap(t => MIME_MAP[t] || []);
  return arr.join(',');
}

export function detectTypeFromMime(mime) {
  if (!mime) return 'document';
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime.startsWith('video/')) return 'video';
  return 'document';
}
