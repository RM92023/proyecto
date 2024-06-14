import { useState } from 'react';
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
    imageUrl: '', // Añadir imageUrl para la previsualización
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setEventData({ ...eventData, image: file, imageUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del evento al servidor
    console.log(eventData);

    // Guardar en localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push({
      ...eventData,
      id: (storedEvents.length + 1).toString(),
      image: eventData.imageUrl // Guardar la URL de la imagen en lugar del archivo
    });
    localStorage.setItem('events', JSON.stringify(storedEvents));
  };

  return (
    <div className="create-event-container">
      <h1>Crear evento</h1>
      <form onSubmit={handleSubmit}>
        {/* Resto de los campos del formulario */}
        <div className="form-group">
          <label>Imagen</label>
          <input type="file" onChange={handleImageChange} required />
          {eventData.imageUrl && <img src={eventData.imageUrl} alt="Preview" className="image-preview" />}
        </div>
        <button type="submit" className="submit-button">Crear evento</button>
      </form>
    </div>
  );
};

export default EventComponent;
