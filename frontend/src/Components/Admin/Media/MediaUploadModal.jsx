/**
 * MediaUploadModal Component
 * Modal para subir múltiples imágenes a una galería específica
 */

import React, { useState } from 'react';
import { Modal, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faImage } from '@fortawesome/free-solid-svg-icons';
import { uploadMediaBulk } from '../../../api/media';
import { toast } from 'react-toastify';
import './MediaUploadModal.css';

const MediaUploadModal = ({ show, onHide, onSuccess, galleryTypes, token }) => {
  const [selectedType, setSelectedType] = useState('2'); // Background por defecto
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Validar tipo de archivo
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`);
      }
      return isImage;
    });

    // Validar tamaño (máx 5MB por imagen)
    const validSizeFiles = validFiles.filter(file => {
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidSize) {
        toast.error(`${file.name} exceeds 5MB limit`);
      }
      return isValidSize;
    });

    setSelectedFiles(prev => [...prev, ...validSizeFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadMediaBulk(
        selectedFiles,
        selectedType,
        token,
        (progress) => setUploadProgress(progress)
      );

      toast.success(`${result.successCount} images uploaded successfully`);
      
      if (result.failedCount > 0) {
        toast.warning(`${result.failedCount} images failed to upload`);
      }

      // Reset form
      setSelectedFiles([]);
      setUploadProgress(0);
      onSuccess();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setSelectedFiles([]);
      setUploadProgress(0);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton={!uploading}>
        <Modal.Title>
          <FontAwesomeIcon icon={faUpload} className="me-2" />
          Upload Images
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Gallery Type Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Gallery Type</Form.Label>
          <Form.Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={uploading}
          >
            {galleryTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.label}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Select the category for these images
          </Form.Text>
        </Form.Group>

        {/* File Input */}
        <Form.Group className="mb-3">
          <Form.Label>Select Images</Form.Label>
          <div className="upload-dropzone">
            <input
              type="file"
              id="file-input"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              className="d-none"
            />
            <label htmlFor="file-input" className="upload-label">
              <FontAwesomeIcon icon={faImage} size="3x" className="mb-3 text-muted" />
              <p className="mb-0">Click to select images or drag and drop</p>
              <small className="text-muted">PNG, JPG, JPEG, SVG (max 5MB each)</small>
            </label>
          </div>
        </Form.Group>

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <div className="selected-files-list">
            <h6>Selected Files ({selectedFiles.length})</h6>
            <div className="files-container">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <FontAwesomeIcon icon={faImage} className="me-2 text-primary" />
                    <span className="file-name">{file.name}</span>
                    <span className="file-size text-muted ms-2">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                    disabled={uploading}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-3">
            <ProgressBar 
              now={uploadProgress} 
              label={`${uploadProgress}%`}
              animated
              striped
            />
            <p className="text-center text-muted mt-2">
              Uploading images... Please wait
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
        >
          {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? 's' : ''}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MediaUploadModal;
