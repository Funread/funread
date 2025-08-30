
import React, { useRef, useState } from 'react';
import { fileAcceptString } from '../utils/fileUtils';
import { save_Image } from '../../../../api/media';

export default function UploadCustom({ allowedTypes = ['image'], galleryType: defaultGalleryType = 1, onUpload = () => {} }) {
  const inp = useRef(null);
  const accept = fileAcceptString(allowedTypes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [galleryType, setGalleryType] = useState(defaultGalleryType);

  const handleFiles = async (files) => {
    const file = files && files[0];
    setError('');
    setSuccess(false);
    if (!file) return;
    // Validación tipo y tamaño
    const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedMime.includes(file.type)) {
      setError('Tipo de archivo no permitido.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo supera el tamaño máximo de 5MB.');
      return;
    }
    setLoading(true);
    try {
      const res = await save_Image(file, galleryType);
      setLoading(false);
      setSuccess(true);
      onUpload(res.data);
    } catch (err) {
      setError('Error al subir la imagen.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-3 text-sm text-gray-600">Selecciona el tipo de galería:</div>
      <select
        className="mb-3 p-2 border rounded"
        value={galleryType}
        onChange={e => setGalleryType(Number(e.target.value))}
        disabled={loading}
      >
        <option value={1}>Custom IMG</option>
        <option value={2}>Background</option>
        <option value={3}>Shapes</option>
        <option value={4}>Personajes</option>
        <option value={5}>Objetos</option>
        <option value={6}>Otros</option>
      </select>
      <div className="mb-3 text-sm text-gray-600">Drag files here or click to browse</div>
      <input ref={inp} type="file" accept={accept} onChange={(e) => handleFiles(e.target.files)} disabled={loading} />
      <div className="mt-3">
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => inp.current && inp.current.click()} disabled={loading}>
          {loading ? 'Subiendo...' : 'Browse'}
        </button>
      </div>
      {error && <div className="mt-2 text-red-600">{error}</div>}
      {success && <div className="mt-2 text-green-600">¡Imagen subida con éxito!</div>}
    </div>
  );
}
