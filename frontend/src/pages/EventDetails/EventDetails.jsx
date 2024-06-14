import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';
import { useState, useEffect } from 'react';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { toast } from 'react-toastify';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }

    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const event = storedEvents.find(event => event.id === id);
    setEvent(event);
  }, [id]);

  if (!event) {
    return <div>Evento no encontrado</div>;
  }

  const handleAttend = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para asistir al evento', { autoClose: 1000 });
      navigate('/login');
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirm = (confirm) => {
    if (confirm) {
      toast.success(`Asistiendo al evento ${event.title}`,{
        autoClose: 1000,
      });
      navigate('/');
    }
    setShowConfirmationModal(false);
  };

  return (
    <div className="event-detail-container">
      <h1>Detalles del Evento</h1>
      <div className="event-detail-banner">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-detail-text">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
      </div>
      <div className="event-detail-info">
        <h4>Ubicación:</h4>
        <p>{event.location}</p>
        <h4>Fecha:</h4>
        <p>{event.date}</p>
        <h4>Hora:</h4>
        <p>{event.startTime} - {event.endTime}</p>
        <h4>Organizador(a):</h4>
        <p>{event.organizer}</p>
      </div>
      <button className="attend-button" onClick={handleAttend}>Asistir</button>
      <button className="back-button" onClick={() => navigate(-1)}>Regresar</button>
      
      <ConfirmationModal show={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={handleConfirm} />
    </div>
  );
};

export default EventDetail;
