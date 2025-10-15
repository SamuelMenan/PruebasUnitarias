// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'UCC : Prácticas Desarrollo Multimedia'", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/UCC : Prácticas Desarrollo Multimedia/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });

  test("muestra enlaces de navegación a nuevas rutas", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Contador/i })).toHaveAttribute('href', '/contador');
    expect(screen.getByRole('link', { name: /Conversor/i })).toHaveAttribute('href', '/conversor');
    expect(screen.getByRole('link', { name: /Tareas/i })).toHaveAttribute('href', '/tareas');
    expect(screen.getByRole('link', { name: /Tablas/i })).toHaveAttribute('href', '/tablas');
    expect(screen.getByRole('link', { name: /Validar/i })).toHaveAttribute('href', '/validar');
  });
});

