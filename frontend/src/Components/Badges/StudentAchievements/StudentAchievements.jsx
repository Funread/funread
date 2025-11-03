/**
 * Student Achievements Page
 * Muestra los badges obtenidos y el progreso hacia los próximos
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge as BootstrapBadge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faMedal, faBook, faStar, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getUserBadgesWithProgress } from '../../../api/badges/userBadges';
import './StudentAchievements.css';

const StudentAchievements = () => {
  const [badgesData, setBadgesData] = useState({
    achieved_badges: [],
    next_badges: [],
    books_read: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const token = user.jwt || sessionStorage.getItem('jwt');
  const userId = user.userId;

  useEffect(() => {
    loadBadges();
  }, [userId]);

  const loadBadges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserBadgesWithProgress(userId, token);
      setBadgesData(data);
    } catch (err) {
      console.error('Error cargando badges:', err);
      setError('No se pudieron cargar tus logros. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const renderBadgeCard = (badge, achieved = true) => {
    const booksRead = badge.progress || 0;
    const goalPoints = badge.goal_points || badge.books_required || 0;
    
    // Limitar el progreso a la meta (no mostrar más de 100%)
    const displayProgress = Math.min(booksRead, goalPoints);
    const progressPercentage = goalPoints > 0 ? Math.min((booksRead / goalPoints) * 100, 100) : 0;
    
    // Determinar si el badge está logrado (cumplió o superó la meta)
    const isBadgeAchieved = achieved || (booksRead >= goalPoints && goalPoints > 0);

    return (
      <Col xs={12} sm={6} md={4} lg={3} key={badge.badgeid || badge.id} className="mb-4">
        <Card className={`badge-card ${isBadgeAchieved ? 'achieved' : 'locked'}`}>
          <Card.Body>
            <div className="badge-icon-container">
              {badge.icon ? (
                <img 
                  src={badge.icon} 
                  alt={badge.title} 
                  className="badge-icon"
                />
              ) : (
                <FontAwesomeIcon 
                  icon={isBadgeAchieved ? faTrophy : faLock} 
                  className={`badge-icon-placeholder ${isBadgeAchieved ? 'text-warning' : 'text-muted'}`}
                  size="3x"
                />
              )}
              {isBadgeAchieved && (
                <div className="achievement-badge">
                  <FontAwesomeIcon icon={faStar} className="text-warning" />
                </div>
              )}
            </div>

            <h5 className="badge-title mt-3">{badge.title}</h5>
            <p className="badge-description text-muted">{badge.description}</p>

            {!isBadgeAchieved && goalPoints > 0 && (
              <div className="progress-section mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faBook} className="me-1" />
                    {displayProgress} / {goalPoints} libros
                  </small>
                  <small className="text-muted">
                    {Math.round(progressPercentage)}%
                  </small>
                </div>
                <ProgressBar 
                  now={progressPercentage} 
                  variant="success"
                  className="badge-progress"
                />
              </div>
            )}

            <div className="badge-footer mt-3">
              <BootstrapBadge bg={isBadgeAchieved ? 'success' : 'secondary'} className="me-2">
                {isBadgeAchieved ? 'Obtenido' : 'Bloqueado'}
              </BootstrapBadge>
              <BootstrapBadge bg="info">
                <FontAwesomeIcon icon={faMedal} className="me-1" />
                {badge.points} pts
              </BootstrapBadge>
              {isBadgeAchieved && badge.date_achieved && (
                <small className="text-muted d-block mt-2">
                  Obtenido: {new Date(badge.date_achieved).toLocaleDateString()}
                </small>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando tus logros...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const { achieved_badges, next_badges, books_read } = badgesData;

  return (
    <Container className="student-achievements py-4">
      {/* Header */}
      <div className="achievements-header mb-4">
        <h2>
          <FontAwesomeIcon icon={faTrophy} className="me-2 text-warning" />
          Mis Logros
        </h2>
        <p className="text-muted">
          Has leído <strong>{books_read || 0}</strong> {books_read === 1 ? 'libro' : 'libros'}
        </p>
      </div>

      {/* Badges Obtenidos */}
      {achieved_badges && achieved_badges.length > 0 && (
        <div className="mb-4">
          <h4 className="section-title mb-3">
            <FontAwesomeIcon icon={faStar} className="me-2 text-warning" />
            Badges Obtenidos ({achieved_badges.length})
          </h4>
          <div className="badges-section">
            <Row className="badges-row">
              {achieved_badges.map(badge => renderBadgeCard(badge, true))}
            </Row>
          </div>
        </div>
      )}

      {/* Próximos Badges */}
      {next_badges && next_badges.length > 0 && (
        <div className="mb-4">
          <h4 className="section-title mb-3">
            <FontAwesomeIcon icon={faLock} className="me-2" />
            Próximos Desafíos ({next_badges.length})
          </h4>
          <div className="badges-section">
            <Row className="badges-row">
              {next_badges.map(badge => renderBadgeCard(badge, false))}
            </Row>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!achieved_badges || achieved_badges.length === 0) && 
       (!next_badges || next_badges.length === 0) && (
        <Alert variant="info" className="text-center">
          <FontAwesomeIcon icon={faBook} size="3x" className="mb-3 d-block mx-auto" />
          <h5>¡Comienza a leer para desbloquear badges!</h5>
          <p className="mb-0">
            Completa libros para ganar badges y puntos. ¡Cada libro cuenta!
          </p>
        </Alert>
      )}
    </Container>
  );
};

export default StudentAchievements;
