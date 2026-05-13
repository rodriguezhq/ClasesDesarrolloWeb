import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a la App</h1>
          <p className="hero-subtitle">
            Explora nuestra lista de productos o regístrate en el formulario.
          </p>
          <div className="hero-actions">
            <NavLink to="/list" className="btn btn-primary">
              Ver Productos
            </NavLink>
            <NavLink to="/form" className="btn btn-secondary">
              Ir al Formulario
            </NavLink>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Lista de Productos</h3>
          <p>Consume datos de una API real con axios y maneja estados de carga, error y datos.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Formulario</h3>
          <p>Formulario controlado con useState, validaciones y diseño profesional.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>React + TypeScript</h3>
          <p>Enrutamiento con React Router, componentes funcionales y buenas prácticas.</p>
        </div>
      </section>
    </div>
  );
}
