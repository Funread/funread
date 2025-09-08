import React, { useRef } from 'react';
import { fileAcceptString } from '../utils/fileUtils';

export default function UploadCustom({ allowedTypes = ['image'], onUpload = () => {} }) {
  const inp = useRef(null);
  const accept = fileAcceptString(allowedTypes);

  const handleFiles = (files) => {
    const file = files && files[0];
    if (!file) return;
    const item = { name: file.name, size: file.size, mime: file.type, type: file.type.split('/')[0], file };
    onUpload(item);
  };

  return (
    <div>
      <div className="mb-3 text-sm text-gray-600">Drag files here or click to browse</div>
      <input ref={inp} type="file" accept={accept} onChange={(e) => handleFiles(e.target.files)} />
      <div className="mt-3">
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => inp.current && inp.current.click()}>Browse</button>
      </div>
    </div>
  );
}
