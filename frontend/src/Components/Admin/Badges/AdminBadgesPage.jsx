/**
 * Admin Badges Page - Dashboard de Administración de Badges
 * Permite crear, editar y eliminar badges
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 
  faTrophy, 
  faUsers, 
  faSync,
  faMedal
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  getAllBadgesAdmin, 
  createBadgeAdmin, 
  updateBadgeAdmin,
  deleteBadgeAdmin,
  assignBadgesToAll
} from '../../../api/admin/badges';
import BadgeTable from './BadgeTable';
import BadgeFormModal from './BadgeFormModal';
import './AdminBadgesPage.css';

const AdminBadgesPage = () => {
  const [badges, setBadges] = useState([]);
  const [filteredBadges, setFilteredBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, teacher, student
  const [showModal, setShowModal] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [stats, setStats] = useState({
    totalBadges: 0,
    totalUsers: 0
  });

  // Obtener token de Redux o sessionStorage
  const user = useSelector((state) => state.user);
  const token = user.jwt || sessionStorage.getItem('jwt');

  useEffect(() => {
    loadBadges();
  }, []);

  // Usar useCallback para evitar dependencias circulares
  const filterBadges = useCallback(() => {
    // Validar que badges sea un array válido
    if (!badges || !Array.isArray(badges)) {
      setFilteredBadges([]);
      return;
    }

    let filtered = badges;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(badge => 
        badge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filterType === 'teacher') {
      filtered = filtered.filter(badge => badge.is_teacher_badge === true);
    } else if (filterType === 'student') {
      filtered = filtered.filter(badge => badge.is_teacher_badge === false);
    }

    setFilteredBadges(filtered);
  }, [badges, searchTerm, filterType]);

  useEffect(() => {
    filterBadges();
  }, [filterBadges]);

  const loadBadges = async () => {
    setLoading(true);
    try {
      const response = await getAllBadgesAdmin(token);
      
      // Manejar la estructura {badges: [], total: X}
      const badgesList = Array.isArray(response.badges) ? response.badges : [];
      
      setBadges(badgesList);
      
      // Calcular estadísticas
      const totalUsers = badgesList.reduce((sum, badge) => sum + (badge.users_count || 0), 0);
      setStats({
        totalBadges: badgesList.length,
        totalUsers: totalUsers
      });
      
    } catch (error) {
      console.error('Error cargando badges:', error);
      toast.error('Error al cargar badges');
      setBadges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBadge = () => {
    setEditingBadge(null);
    setShowModal(true);
  };

  const handleEditBadge = (badge) => {
    setEditingBadge(badge);
    setShowModal(true);
  };

  const handleDeleteBadge = async (badgeId) => {
    if (!window.confirm('¿Estás seguro de eliminar este badge? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await deleteBadgeAdmin(badgeId, token);
      toast.success('Badge eliminado correctamente');
      loadBadges();
    } catch (error) {
      console.error('Error eliminando badge:', error);
      toast.error('Error al eliminar badge');
    }
  };

  const handleSaveBadge = async (badgeData) => {
    try {
      console.log('💾 Guardando badge...', JSON.stringify(badgeData, null, 2));
      
      if (editingBadge) {
        // Actualizar badge existente
        console.log('📝 Actualizando badge ID:', editingBadge.id);
        await updateBadgeAdmin(editingBadge.id, badgeData, token);
        toast.success('Badge actualizado correctamente');
      } else {
        // Crear nuevo badge
        await createBadgeAdmin(badgeData, token);
        toast.success('Badge creado correctamente');
      }
      
      setShowModal(false);
      
      // Limpiar filtros para mostrar el nuevo badge
      setSearchTerm('');
      setFilterType('all');
      
      await loadBadges(); // Esperar a que termine de cargar
      
    } catch (error) {
      console.error('Error guardando badge:', error);
      toast.error('Error al guardar badge');
      throw error;
    }
  };

  const handleAssignToAll = async () => {
    if (!window.confirm('¿Deseas asignar badges a todos los usuarios según sus libros leídos? Esto puede tardar unos momentos.')) {
      return;
    }

    try {
      const result = await assignBadgesToAll(token);
      
      if (result.success) {
        toast.success(
          `¡Asignación completada! ${result.total_badges_assigned} badges asignados a ${result.total_users_processed} usuarios`,
          { autoClose: 5000 }
        );
        loadBadges();
      } else {
        toast.error('Error en la asignación masiva');
      }
    } catch (error) {
      console.error('Error en asignación masiva:', error);
      toast.error('Error al asignar badges');
    }
  };

  return (
    <Container fluid className="admin-badges-page">
      {/* Header */}
      <div className="page-header mb-4">
        <h2 className="page-title">
          <FontAwesomeIcon icon={faTrophy} className="me-2" />
          Gestión de Badges
        </h2>
        <p className="text-muted">
          Administra los badges del sistema y asígnales a los usuarios
        </p>
      </div>

      {/* Estadísticas */}
      <Row className="mb-3">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-primary">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalBadges}</h3>
                <p className="text-muted">Total de Badges</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-success">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalUsers}</h3>
                <p className="text-muted">Asignaciones Totales</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-warning">
                <FontAwesomeIcon icon={faMedal} />
              </div>
              <div className="stat-content">
                <h3>{filteredBadges.filter(b => b.show_progress).length}</h3>
                <p className="text-muted">Badges Automáticos</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Controles */}
      <Card className="mb-3">
        <Card.Body className="py-2">
          <Row className="align-items-center">
            <Col md={4}>
              <Button 
                variant="primary" 
                onClick={handleCreateBadge}
                className="me-2"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Crear Badge
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={handleAssignToAll}
              >
                <FontAwesomeIcon icon={faSync} className="me-2" />
                Asignar a Todos
              </Button>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar badges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Todos los badges</option>
                <option value="student">Para estudiantes</option>
                <option value="teacher">Para profesores</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabla de badges */}
      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Cargando badges...</p>
            </div>
          ) : filteredBadges.length === 0 ? (
            <Alert variant="info">
              <FontAwesomeIcon icon={faTrophy} className="me-2" />
              {searchTerm || filterType !== 'all' 
                ? 'No se encontraron badges con los filtros aplicados.'
                : 'No hay badges creados. ¡Crea el primero!'}
            </Alert>
          ) : (
            <BadgeTable 
              badges={filteredBadges}
              onEdit={handleEditBadge}
              onDelete={handleDeleteBadge}
            />
          )}
        </Card.Body>
      </Card>

      {/* Modal de formulario */}
      <BadgeFormModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveBadge}
        badge={editingBadge}
      />
    </Container>
  );
};

export default AdminBadgesPage;
