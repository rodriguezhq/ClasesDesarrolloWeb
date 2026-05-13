import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import List from "./components/List";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Productos
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Formulario
        </NavLink>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} PracticaSemana6 - React + TypeScript</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
