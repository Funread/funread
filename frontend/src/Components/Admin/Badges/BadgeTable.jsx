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
      <Table hover className="badge-table">
        <thead>
          <tr>
            <th className="badge-id">ID</th>
            <th className="badge-title">Badge</th>
            <th className="badge-points">Points</th>
            <th className="badge-goal">Required Books</th>
            <th className="badge-type">Type</th>
            <th className="badge-auto">Auto</th>
            <th className="badge-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => (
            <tr key={badge.id}>
              <td className="badge-id">#{badge.id}</td>
              
              <td className="badge-title">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{badge.description}</Tooltip>}
                >
                  <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon 
                      icon={faTrophy} 
                      className="flex-shrink-0" 
                      style={{ color: badge.is_teacher_badge ? '#6c757d' : '#ffd700' }}
                    />
                    <strong>{badge.title}</strong>
                  </div>
                </OverlayTrigger>
              </td>
              
              <td className="badge-points">
                <Badge bg="success" className="points-badge">
                  +{badge.points} pts
                </Badge>
              </td>
              
              <td className="badge-goal">
                {badge.goal_points ? (
                  <Badge bg="info">{badge.goal_points} books</Badge>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              
              <td className="badge-type">
                <Badge bg={badge.is_teacher_badge ? 'secondary' : 'primary'}>
                  {badge.is_teacher_badge ? 'Teacher' : 'Student'}
                </Badge>
              </td>
              
              <td className="badge-auto">
                {badge.show_progress ? (
                  <FontAwesomeIcon icon={faCheck} className="text-success" title="Automatic assignment" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} className="text-muted" title="Manual" />
                )}
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
