/**
 * Badge Table Component
 * Tabla para mostrar badges en el admin dashboard
 */

import React from 'react';
import { Table, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faTrophy,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './BadgeTable.css';

const BadgeTable = ({ badges, onEdit, onDelete }) => {
  // Validar que badges sea un array
  if (!badges || !Array.isArray(badges)) {
    console.error('BadgeTable: badges debe ser un array', badges);
    return (
      <div className="alert alert-warning">
        Error: No se pudo cargar la lista de badges
      </div>
    );
  }

  if (badges.length === 0) {
    console.warn('BadgeTable: array de badges está vacío');
  }

  return (
    <div className="badge-table-container">
      <Table responsive hover className="badge-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Badge</th>
            <th>Descripción</th>
            <th>Puntos</th>
            <th>Libros Req.</th>
            <th>Tipo</th>
            <th>Auto</th>
            <th>Usuarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => (
            <tr key={badge.id}>
              <td className="badge-id">#{badge.id}</td>
              
              <td className="badge-title">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon 
                    icon={faTrophy} 
                    className="me-2" 
                    style={{ color: badge.is_teacher_badge ? '#6c757d' : '#ffd700' }}
                  />
                  <strong>{badge.title}</strong>
                </div>
              </td>
              
              <td className="badge-description">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{badge.description}</Tooltip>}
                >
                  <span className="text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                    {badge.description}
                  </span>
                </OverlayTrigger>
              </td>
              
              <td className="badge-points">
                <Badge bg="success" className="points-badge">
                  +{badge.points} pts
                </Badge>
              </td>
              
              <td className="badge-goal">
                {badge.goal_points ? (
                  <Badge bg="info">{badge.goal_points} libros</Badge>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              
              <td className="badge-type">
                <Badge bg={badge.is_teacher_badge ? 'secondary' : 'primary'}>
                  {badge.is_teacher_badge ? 'Profesor' : 'Estudiante'}
                </Badge>
              </td>
              
              <td className="badge-auto">
                {badge.show_progress ? (
                  <FontAwesomeIcon icon={faCheck} className="text-success" title="Asignación automática" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} className="text-muted" title="Manual" />
                )}
              </td>
              
              <td className="badge-users">
                <Badge bg="light" text="dark">
                  {badge.users_count || 0} usuarios
                </Badge>
              </td>
              
              <td className="badge-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(badge)}
                  title="Editar badge"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(badge.id)}
                  title="Eliminar badge"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BadgeTable;
