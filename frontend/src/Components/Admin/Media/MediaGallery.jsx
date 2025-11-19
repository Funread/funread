/**
 * MediaGallery Component
 * Muestra las imágenes de un tipo de galería específico
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getMediaByType, deleteMedia } from '../../../api/media';
import { toast } from 'react-toastify';
import './MediaGallery.css';

const MediaGallery = ({ galleryType, galleryName, token, refreshKey }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadImages();
  }, [galleryType, refreshKey]);

  useEffect(() => {
    filterImages();
  }, [images, searchTerm]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await getMediaByType(galleryType, token);
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Error loading images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    if (!searchTerm) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter(img => 
      img.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  const handleDelete = async (imageId, imageName) => {
    if (!window.confirm(`Are you sure you want to delete "${imageName}"?`)) {
      return;
    }

    try {
      await deleteMedia(imageId, token);
      toast.success('Image deleted successfully');
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="media-gallery">
      {/* Search bar and count - Fixed at top */}
      <div className="mb-3">
        <Form.Group className="mb-3">
          <div className="position-relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="position-absolute" 
              style={{ left: '12px', top: '12px', color: '#6c757d' }}
            />
            <Form.Control
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </Form.Group>

        {/* Image count */}
        <p className="text-muted mb-0">
          {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Scrollable images grid */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '5px' }}>
        {/* Images grid */}
        {filteredImages.length === 0 ? (
          <Alert variant="info">
            {searchTerm 
              ? 'No images found matching your search.'
              : `No images uploaded yet in ${galleryName} category. Upload your first image!`
            }
          </Alert>
        ) : (
          <Row>
            {filteredImages.map((image) => (
              <Col key={image.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                <Card className="media-card h-100">
                  <div className="media-image-container">
                    <Card.Img 
                      variant="top" 
                      src={image.file || image.url} 
                      alt={image.name || 'Image'}
                      className="media-image"
                    />
                  </div>
                  <Card.Body className="p-2">
                    <Card.Title className="media-title" title={image.name || `Image ${image.id}`}>
                      {image.name || `Image ${image.id}`}
                    </Card.Title>
                    {image.isfunreadMedia && (
                      <Card.Text className="text-success small mb-1">
                        <small>✓ Public (FunRead Media)</small>
                      </Card.Text>
                    )}
                    {image.uploadedBy && (
                      <Card.Text className="text-muted small mb-2" title={`Uploaded by: ${image.uploadedBy.name}`}>
                        <small>By: {image.uploadedBy.name}</small>
                      </Card.Text>
                    )}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100 mt-2"
                      onClick={() => handleDelete(image.id, image.name || `Image ${image.id}`)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
