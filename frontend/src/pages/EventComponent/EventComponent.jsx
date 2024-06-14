import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventComponent.css';

const EventComponent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    address: '',
    city: '',
    category: '',
    startTime: '',
    endTime: '',
    price: '',
    description: '',
    image: null,
    imageUrl: '',
    organizer: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventData({ ...eventData, image: file, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push({
      ...eventData,
      id: (storedEvents.length + 1).toString(),
      image: eventData.imageUrl
    });
    localStorage.setItem('events', JSON.stringify(storedEvents));

    // Redirigir al home
    navigate('/');
  };

  return (
    <div className="create-event-container">
      <h1>Crear evento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del evento</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Lugar</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input type="text" name="address" value={eventData.address} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <input type="text" name="city" value={eventData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select name="category" value={eventData.category} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="danza">Danza</option>
            <option value="tecnologia">Tecnología</option>
            <option value="culturayeducacion">Cultura y Educación</option>
            <option value="yoga">Yoga</option>
          </select>
        </div>

        <div className="form-group">
          <label>Horario</label>
          <div className="time-group">
            <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />
            <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input type="number" name="price" value={eventData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea className='resize' name="description" value={eventData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Imagen</label>
          <input type="file" onChange={handleImageChange} required />
          {eventData.imageUrl && <img src={eventData.imageUrl} alt="Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Organizador</label>
          <input type="text" name="organizer" value={eventData.organizer} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Crear evento</button>
      </form>
    </div>
  );
};

export default EventComponent;
