/**
 * Admin Media Page - Dashboard para gestión de imágenes del sistema
 * Permite subir y gestionar imágenes por tipo de galería
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImages,
  faUpload,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import MediaGallery from './MediaGallery';
import MediaUploadModal from './MediaUploadModal';
import './AdminMediaPage.css';

const AdminMediaPage = () => {
  const [activeTab, setActiveTab] = useState('2'); // Background por defecto
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Obtener token de Redux o sessionStorage
  const user = useSelector((state) => state.user);
  const token = user.jwt || sessionStorage.getItem('jwt');

  // Tipos de galería (excluyendo Custom=1, BookCover=7, BadgeIcons=8)
  const galleryTypes = [
    { id: '2', name: 'Background', label: 'Backgrounds', icon: '🖼️' },
    { id: '3', name: 'Shapes', label: 'Shapes', icon: '⬛' },
    { id: '4', name: 'Characters', label: 'Characters', icon: '👤' },
    { id: '5', name: 'Objects', label: 'Objects', icon: '📦' },
  ];

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
    setRefreshKey(prev => prev + 1); // Forzar refresh de la galería
    toast.success('Images uploaded successfully');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    toast.info('Refreshing gallery...');
  };

  return (
    <Container fluid className="admin-media-page">
      {/* Header */}
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="page-title">
              <FontAwesomeIcon icon={faImages} className="me-2" />
              Media Management
            </h2>
            <p className="text-muted mb-0">
              Upload and manage system images by category
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-secondary" 
              onClick={handleRefresh}
              title="Refresh gallery"
            >
              <FontAwesomeIcon icon={faSync} className="me-2" />
              Refresh
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowUploadModal(true)}
            >
              <FontAwesomeIcon icon={faUpload} className="me-2" />
              Upload Images
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs por tipo de galería */}
      <Card>
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            {galleryTypes.map(type => (
              <Tab 
                key={type.id} 
                eventKey={type.id} 
                title={
                  <span>
                    <span className="me-2">{type.icon}</span>
                    {type.label}
                  </span>
                }
              >
                <MediaGallery 
                  galleryType={type.id}
                  galleryName={type.name}
                  token={token}
                  refreshKey={refreshKey}
                />
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>

      {/* Modal de Upload */}
      <MediaUploadModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        onSuccess={handleUploadSuccess}
        galleryTypes={galleryTypes}
        token={token}
      />
    </Container>
  );
};

export default AdminMediaPage;
