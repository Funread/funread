/**
 * Badge Form Modal Component
 * Modal para crear/editar badges
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faBook, faStar } from '@fortawesome/free-solid-svg-icons';
import './BadgeFormModal.css';

const BadgeFormModal = ({ show, onHide, onSave, badge }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 0,
    icon: '',
    is_teacher_badge: false,
    show_progress: true,
    goal_points: 1
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
      }
      setErrors({});
    }
  }, [show, badge]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let finalValue = value;
    
    // Para inputs numéricos, convertir a número
    if (type === 'number') {
      finalValue = value === '' ? 0 : parseInt(value, 10);
      // Asegurar que sea un número válido
      if (isNaN(finalValue)) finalValue = 0;
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
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        points: parseInt(formData.points),
        goal_points: formData.show_progress ? parseInt(formData.goal_points) : null
      };

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
    } catch (error) {
      console.error('Error guardando badge:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered
      dialogClassName="badge-form-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {badge ? 'Editar Badge' : 'Crear Nuevo Badge'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Título del Badge <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Lector Principiante"
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Descripción <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe el logro..."
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Puntos <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    isInvalid={!!errors.points}
                    style={{ minWidth: '120px' }}
                  />
                  <InputGroup.Text>pts</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.points}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted d-block mt-2">
                  Puntos que el usuario ganará al obtener este badge
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Icono (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/icono.png"
                />
                <Form.Text className="text-muted">
                  Opcional. Deja vacío para usar el icono de trofeo por defecto 🏆
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="is_teacher_badge"
                  label="Badge para profesores"
                  checked={formData.is_teacher_badge}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Si está marcado, este badge es exclusivo para profesores.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="show_progress"
                  label="Asignación automática (por libros leídos)"
                  checked={formData.show_progress}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Si está activado, el badge se asignará automáticamente al alcanzar la meta de libros.
                </Form.Text>
              </Form.Group>
            </Col>

            {formData.show_progress && (
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Meta de Libros <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="goal_points"
                      value={formData.goal_points}
                      onChange={handleChange}
                      min="1"
                      step="1"
                      isInvalid={!!errors.goal_points}
                      style={{ minWidth: '120px' }}
                    />
                    <InputGroup.Text>libros completados</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.goal_points}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className="text-muted d-block mt-2">
                    Cantidad de libros que el usuario debe completar para obtener este badge
                  </Form.Text>
                </Form.Group>
              </Col>
            )}
          </Row>

          {/* Preview */}
          <div className="badge-preview mt-4 p-3 border rounded bg-light">
            <h6 className="text-muted mb-2">Vista Previa:</h6>
            <div className="d-flex align-items-center">
              <div className="badge-preview-icon me-3">
                🏆
              </div>
              <div>
                <h5 className="mb-1">{formData.title || 'Título del Badge'}</h5>
                <p className="mb-1 text-muted small">
                  {formData.description || 'Descripción del badge'}
                </p>
                <div>
                  <span className="badge bg-success me-2">+{formData.points} puntos</span>
                  {formData.show_progress && (
                    <span className="badge bg-info">{formData.goal_points} libros</span>
                  )}
                  <span className="badge bg-secondary ms-2">
                    {formData.is_teacher_badge ? 'Profesor' : 'Estudiante'}
                  </span>
                </div>
              </div>
            </div>
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
