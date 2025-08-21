import { useState } from 'react';
import { TAB_NAMES } from '../constants';

export function useUploadMedia({ allowedTypes = ['image'] } = {}) {
  const [activeView, setActiveView] = useState(TAB_NAMES.RECENT);
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('upload_media_recent') || '[]'); } catch { return []; }
  });
  const [gallery] = useState([]);

  const addRecent = (file) => {
    const item = { name: file.name || file.file?.name || 'file', type: file.type || file.mime || (file.file && file.file.type && file.file.type.split('/')[0]) || 'unknown', time: Date.now(), size: file.size || 0, payload: file };
    const next = [item, ...recent].slice(0, 30);
    setRecent(next);
    try { localStorage.setItem('upload_media_recent', JSON.stringify(next)); } catch {}
  };

  return {
    state: { activeView, recent, gallery },
    actions: { setActiveView, addRecent }
  };
}
