import { useState, useEffect } from 'react';
import './ItTalks.css';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { toast } from 'react-toastify';

const ItTalks = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleAttend = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirm = (confirm) => {
    if (confirm) {
      toast.success(`Asistiendo al evento ${selectedEvent.title}`, {
        autoClose: 1000,
      });
    }
    setShowConfirmationModal(false);
    setShowModal(false);
  };

  return (
    <div className="container-it-talks">
      <h1>Eventos disponibles</h1>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} alt={event.title} />
            <div className="event-text">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.organizer}</p>
              <button className="info-button" onClick={() => handleShowModal(event)}>Vista previa</button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} event={selectedEvent} onAttend={handleAttend} />
      <ConfirmationModal show={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={handleConfirm} />
    </div>
  );
};

export default ItTalks;
