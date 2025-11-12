import { useState, useEffect } from 'react';
import { TAB_NAMES } from '../constants';
import { list } from '../../../../api/media';

export function useUploadMedia({ allowedTypes = ['image'], galleryType = null } = {}) {


  const [activeView, setActiveView] = useState(TAB_NAMES.RECENT);
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('upload_media_recent') || '[]'); } catch { return []; }
  });
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (activeView === TAB_NAMES.MY_GALLERY) {
      list().then(res => {
        console.log('Respuesta API /Media/list:', res.data);
        console.log('galleryType filtro actual:', galleryType);
        
        // Log first item to see structure
        if (res.data && res.data.length > 0) {
          console.log('Estructura primer item:', res.data[0]);
          console.log('Claves del primer item:', Object.keys(res.data[0]));
        }
        
        // Filter by galleryType if provided
        let filtered = res.data;
        if (galleryType) {
          // Try different possible field names from backend
          filtered = res.data.filter(item => {
            const itemGalleryType = item.gallery_type || item.galleryType || item.type;
            console.log('Item:', item.name, 'gallery_type:', itemGalleryType, 'match:', itemGalleryType === galleryType);
            return itemGalleryType === galleryType;
          });
        }
        console.log('Items filtrados:', filtered.length);
        setGallery(filtered);
      });
    }
  }, [activeView, galleryType]);

  const addRecent = (file) => {
    // Permitir File, Blob, o string con tipo imagen
    if (!file) return;
    let isImage = false;
    if (typeof file.type === 'string' && file.type.startsWith('image/')) {
      isImage = true;
    } else if (typeof file === 'string') {
      // Si es string, asumimos que es una url de imagen
      isImage = true;
    } else if (file.file && typeof file.file.type === 'string' && file.file.type.startsWith('image/')) {
      isImage = true;
    }
    if (!isImage) return;
    const item = {
      name: file.name || file.file?.name || 'file',
      type: 1, // 1 para imagen
      gallery_type: galleryType, // Store the galleryType with recent items
      time: Date.now(),
      size: file.size || 0,
      payload: file
    };
    setRecent(prev => {
      const next = [item, ...prev].slice(0, 30);
      try { localStorage.setItem('upload_media_recent', JSON.stringify(next)); } catch {}
      return next;
    });
  };
  // Función para limpiar recientes (puede llamarse al cerrar sesión)
  const clearRecent = () => {
    try { localStorage.removeItem('upload_media_recent'); } catch {}
    setRecent([]);
  };

  return {
    state: { activeView, recent, gallery },
    actions: { setActiveView, addRecent, clearRecent }
  };
}