import React from 'react';
// import error404 from '../../assets/img/pizza-estado-vacio-error-404-ilustracion-plana_288067-137.jpg';

import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found-container">
        <h1 className="not-found-title">Error 404</h1>
        <p className="not-found-message">Sorry, we could not find what you are looking for.</p>
        {/* <img src={error404} alt="Imagen de comida no encontrada" className="not-found-image" /> */}
        <a href="/home" className="not-found-link">Volver al inicio</a>
        </div>
    );
}

export default NotFound;
         