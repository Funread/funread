import React, { useRef, useState } from 'react';
import { fileAcceptString } from '../utils/fileUtils';
import { save_Image } from '../../../../api/media';

export default function UploadCustom({ allowedTypes = ['image'], galleryType: defaultGalleryType = null, onUpload = () => {} }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const inp = useRef(null);
  const accept = fileAcceptString(allowedTypes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [galleryType, setGalleryType] = useState(defaultGalleryType);

  const handleFiles = async (files) => {
    if (!galleryType) {
      setError('Seleccione el tipo de imagen antes de cargar.');
      return;
    }
    setDragActive(false);
    setPreview(null);
    setFileName('');
    setError('');
    setSuccess(false);
    const file = files && files[0];
    if (!file || typeof file.type !== 'string') return;
    setFileName(file.name);
    if (file.type && typeof file.type === 'string' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
    // Validación tipo y tamaño
    const allowedMime = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedMime.includes(file.type)) {
      setError('Tipo de archivo no permitido.');
      setSuccess(false);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo supera el tamaño máximo de 5MB.');
      setSuccess(false);
      return;
    }
    setLoading(true);
    try {
      const res = await save_Image(file, galleryType);
      setLoading(false);
      setSuccess(true);
      setError('');
      onUpload(file); // <-- Pasar el archivo original
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      let msg = 'Error al subir la imagen.';
      if (err && err.response && err.response.data && err.response.data.detail) {
        msg += ' ' + err.response.data.detail;
      } else if (err && err.message) {
        msg += ' ' + err.message;
      }
      setError(msg);
      setSuccess(false);
      setLoading(false);
    }
  };

  const isTypeSelected = !!galleryType;

  return (
  <div>
      <select
        className="mb-3 p-2 border rounded"
        value={galleryType || ''}
        onChange={e => setGalleryType(Number(e.target.value))}
        disabled={loading}
      >
        <option value="">Select type...</option>
        <option value={1}>Custom IMG</option>
        <option value={2}>Background</option>
        <option value={3}>Shapes</option>
        <option value={4}>Characters</option>
        <option value={5}>Objects</option>
        <option value={6}>Others</option>
      </select>
      <div
        className={`mb-3 w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${dragActive ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 hover:bg-blue-50'} ${!isTypeSelected ? 'opacity-50 pointer-events-none' : ''}`}
        style={{ minHeight: 220 }}
        onClick={() => isTypeSelected && inp.current && inp.current.click()}
        onDragOver={e => { if (isTypeSelected) { e.preventDefault(); e.stopPropagation(); setDragActive(true); } }}
        onDragLeave={e => { if (isTypeSelected) { e.preventDefault(); e.stopPropagation(); setDragActive(false); } }}
        onDrop={e => {
          if (isTypeSelected) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }
        }}
      >
        <input
          ref={inp}
          type="file"
          accept={accept}
          onChange={e => isTypeSelected && handleFiles(e.target.files)}
          style={{ display: 'none' }}
          disabled={!isTypeSelected}
        />
        <svg width="48" height="48" fill="#3b82f6" viewBox="0 0 24 24" className="mb-2">
          <path d="M12 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-8c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm7.5 8.5c0 .828-.672 1.5-1.5 1.5h-15c-.828 0-1.5-.672-1.5-1.5v-11c0-.828.672-1.5 1.5-1.5h15c.828 0 1.5.672 1.5 1.5v11zm-1.5-12.5h-15c-1.654 0-3 1.346-3 3v11c0 1.654 1.346 3 3 3h15c1.654 0 3-1.346 3-3v-11c0-1.654-1.346-3-3-3z"/>
        </svg>
        <span className="text-lg text-gray-700 font-medium mb-2">Drag an image here or click to select</span>
        {!isTypeSelected && <span className="text-red-600 mt-2">Select the image type before uploading.</span>}
        {fileName && <span className="text-blue-700 mt-2">Selected file: {fileName}</span>}
        {preview && <img src={preview} alt="Vista previa" className="mt-2 rounded shadow" style={{ maxWidth: 120, maxHeight: 120 }} />}
      </div>
      {error && <div className="mt-2 text-red-600">{error}</div>}
      {success && <div className="mt-2 text-green-600">Image uploaded successfully!</div>}
    </div>
  );
}
