/**
 * Badge Form Modal Component
 * Modal para crear/editar badges
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faTimes, 
  faUpload, 
  faImage, 
  faStar, 
  faBook, 
  faChalkboardTeacher, 
  faUser,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { save_Image, upload } from '../../../api/media';
import './BadgeFormModal.css';

const BadgeFormModal = ({ show, onHide, onSave, badge }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: '',
    icon: '',
    is_teacher_badge: false,
    show_progress: true,
    goal_points: ''
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [uploadingIcon, setUploadingIcon] = useState(false);

  // Efecto para cargar datos del badge al editar
  useEffect(() => {
    if (show) {
      if (badge) {
        // Modo edición
        setFormData({
          title: badge.title || '',
          description: badge.description || '',
          points: badge.points || 0,
          icon: badge.icon || '',
          is_teacher_badge: badge.is_teacher_badge || false,
          show_progress: badge.show_progress !== undefined ? badge.show_progress : true,
          goal_points: badge.goal_points || 1
        });
        
        // Si hay un icono que es una URL de imagen, establecer preview
        if (badge.icon && badge.icon.includes('/api/media/')) {
          setIconPreview(badge.icon);
        }
      } else {
        // Modo creación - resetear formulario
        setFormData({
          title: '',
          description: '',
          points: 0,
          icon: '',
          is_teacher_badge: false,
          show_progress: true,
          goal_points: 1
        });
        setIconFile(null);
        setIconPreview(null);
      }
      setErrors({});
    }
  }, [show, badge]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let finalValue = value;
    
    // Para inputs numéricos, permitir valores vacíos
    if (type === 'number') {
      finalValue = value === '' ? '' : value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : finalValue
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar el tipo de archivo
      const allowedMime = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!allowedMime.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          icon: 'Only PNG, JPG, JPEG, and SVG files are allowed'
        }));
        return;
      }

      // Validar el tamaño del archivo (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          icon: 'File is too large. Maximum size is 2MB'
        }));
        return;
      }

      // Guardar el archivo para subirlo después
      setIconFile(file);

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => setIconPreview(e.target.result);
      reader.readAsDataURL(file);

      // Limpiar error si existe
      if (errors.icon) {
        setErrors(prev => ({
          ...prev,
          icon: ''
        }));
      }
    }
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview(null);
    setFormData(prev => ({
      ...prev,
      icon: ''
    }));

    // Limpiar el input de archivo
    const fileInput = document.getElementById('icon-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Función para subir el icono siguiendo el patrón de la aplicación
  const uploadIcon = async () => {
    if (!iconFile) return null;

    try {
      setUploadingIcon(true);

      // Paso 1: Guardar imagen en el servidor
      // galleryType = 8 para Badge Icons (o 1 para CustomIMG)
      const saveResponse = await save_Image(iconFile, 8);

      if (!saveResponse.data || !saveResponse.data.name) {
        throw new Error('Error uploading icon image');
      }

      // Paso 2: Obtener la ruta completa del archivo
      const imageName = saveResponse.data.name;
      const uploadResponse = await upload(imageName);

      if (!uploadResponse.data || !uploadResponse.data.file_route) {
        throw new Error('Error getting icon file route');
      }

      setUploadingIcon(false);
      return uploadResponse.data.file_route;

    } catch (error) {
      setUploadingIcon(false);
      console.error('Error uploading icon:', error);
      throw error;
    }
  };

  // Función para incrementar/decrementar valores numéricos
  const handleNumericChange = (field, increment) => {
    setFormData(prev => {
      const currentValue = parseInt(prev[field]) || 0;
      const newValue = Math.max(0, currentValue + increment);
      return {
        ...prev,
        [field]: newValue
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (formData.points < 0) {
      newErrors.points = 'Los puntos deben ser positivos';
    }

    if (formData.show_progress && formData.goal_points < 1) {
      newErrors.goal_points = 'La meta debe ser al menos 1 libro';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);

    try {
      // Validar campos numéricos
      if (formData.points === '') {
        setSaving(false);
        setErrors(prev => ({
          ...prev,
          points: 'Los puntos son requeridos'
        }));
        return;
      }

      if (formData.show_progress && formData.goal_points === '') {
        setSaving(false);
        setErrors(prev => ({
          ...prev,
          goal_points: 'La meta de libros es requerida'
        }));
        return;
      }

      // Subir icono si hay un archivo nuevo
      let iconUrl = formData.icon; // Mantener el existente si es edición
      
      if (iconFile) {
        try {
          toast.info('Uploading icon...');
          iconUrl = await uploadIcon();
          toast.success('Icon uploaded successfully!');
        } catch (error) {
          setSaving(false);
          toast.error('Error uploading icon. Please try again.');
          console.error('Icon upload error:', error);
          return;
        }
      }

      // Preparar datos para enviar
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        points: parseInt(formData.points) || 0,
        is_teacher_badge: formData.is_teacher_badge,
        show_progress: formData.show_progress,
        icon: iconUrl // URL de la imagen o nombre del ícono FontAwesome
      };
      
      if (formData.show_progress) {
        dataToSend.goal_points = parseInt(formData.goal_points) || 1;
      }

      await onSave(dataToSend);
      
      // Resetear formulario
      setFormData({
        title: '',
        description: '',
        points: 0,
        icon: '',
        is_teacher_badge: false,
        show_progress: true,
        goal_points: 1
      });
      setIconFile(null);
      setIconPreview(null);
      
    } catch (error) {
      console.error('Error saving badge:', error);
      toast.error('Error saving badge');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      centered
      dialogClassName="badge-form-modal custom-wide-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {badge ? 'Edit Badge' : 'Create New Badge'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="badge-form-container">
            {/* Preview Section */}
            <div className="badge-preview-section">
              <h6 className="preview-title">PREVIEW</h6>
              <div className="preview-content">
                <div className="badge-preview-box">
                  {iconPreview ? (
                    <img 
                      src={iconPreview} 
                      alt="Badge preview"
                      className="preview-icon"
                    />
                  ) : formData.icon && formData.icon.includes('/api/media/') ? (
                    <img 
                      src={formData.icon} 
                      alt="Badge preview"
                      className="preview-icon"
                    />
                  ) : (
                    <div className="preview-icon-placeholder">
                      <FontAwesomeIcon icon={faImage} />
                    </div>
                  )}
                  <div className="preview-details">
                    <h5 className="preview-badge-title">
                      {formData.title || 'Badge Title'}
                    </h5>
                    <p className="preview-description">
                      {formData.description || 'Badge description will appear here...'}
                    </p>
                    <div className="preview-badges">
                      <span className="badge bg-primary">+{formData.points || 0} pts</span>
                      {formData.show_progress && (
                        <span className="badge bg-info">{formData.goal_points || 0} books</span>
                      )}
                      <span className="badge bg-secondary">
                        {formData.is_teacher_badge ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <Row>
              <Col md={3}>
                <div className="image-upload-section">
                  <Form.Label className="mb-2">Badge Icon</Form.Label>
                  <div 
                    className={`icon-box ${iconPreview || formData.icon ? 'has-image' : ''}`}
                    onClick={() => document.getElementById('icon-upload').click()}
                  >
                    {iconPreview ? (
                      <img 
                        src={iconPreview} 
                        alt="Badge icon preview"
                        className="icon-image"
                      />
                    ) : formData.icon && formData.icon.includes('/api/media/') ? (
                      <img 
                        src={formData.icon} 
                        alt="Badge icon"
                        className="icon-image"
                      />
                    ) : (
                      <div className="icon-placeholder">
                        <FontAwesomeIcon icon={faImage} size="2x" />
                        <span className="upload-text">Click to upload icon</span>
                        <small className="text-muted mt-1">PNG, JPG, SVG (Max 2MB)</small>
                      </div>
                    )}
                  </div>
                  
                  {uploadingIcon && (
                    <div className="text-center mt-2">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <small className="text-muted">Uploading icon...</small>
                    </div>
                  )}
                  
                  <div className="icon-controls mt-3 d-flex gap-2 justify-content-center">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => document.getElementById('icon-upload').click()}
                      disabled={uploadingIcon}
                    >
                      <FontAwesomeIcon icon={iconPreview ? faImage : faUpload} className="me-1" />
                      {iconPreview ? 'Change Icon' : 'Upload Icon'}
                    </Button>
                    
                    {(iconPreview || formData.icon) && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={handleRemoveIcon}
                        disabled={uploadingIcon}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <Form.Control
                    type="file"
                    id="icon-upload"
                    className="d-none"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleIconUpload}
                  />
                  
                  {errors.icon && (
                    <div className="alert alert-danger mt-2 py-2" role="alert">
                      <small>{errors.icon}</small>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={9}>
                <Form.Group className="mb-3">
                  <Form.Label>Badge Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g.: Beginner Reader"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the achievement..."
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Points <span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          name="points"
                          value={formData.points}
                          onChange={handleChange}
                          min="0"
                          step="1"
                          isInvalid={!!errors.points}
                        />
                        <InputGroup.Text>pts</InputGroup.Text>
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {errors.points}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={8}>
                    <Form.Group className="mt-2">
                      <Form.Check
                        type="checkbox"
                        id="teacherBadge"
                        name="is_teacher_badge"
                        label="Teacher Badge"
                        checked={formData.is_teacher_badge}
                        onChange={handleChange}
                        className="mb-2"
                      />
                      <Form.Check
                        type="checkbox"
                        id="automaticAssignment"
                        name="show_progress"
                        label="Automatic assignment by books read"
                        checked={formData.show_progress}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {formData.show_progress && (
                  <Form.Group>
                    <Form.Label>Books Goal <span className="text-danger">*</span></Form.Label>
                    <InputGroup style={{ maxWidth: '200px' }}>
                      <Form.Control
                        type="number"
                        name="goal_points"
                        value={formData.goal_points}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        isInvalid={!!errors.goal_points}
                      />
                      <InputGroup.Text>books</InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errors.goal_points}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={saving}>
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            <FontAwesomeIcon icon={faSave} className="me-2" />
            {saving ? 'Guardando...' : (badge ? 'Actualizar' : 'Crear Badge')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BadgeFormModal;
