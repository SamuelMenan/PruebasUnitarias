// src/components/DigitalClock.test.tsx
import { render, screen, act } from "@testing-library/react";
import DigitalClock from "./DigitalClock";

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2023-01-01T12:00:00"));
});
afterEach(() => {
  jest.useRealTimers();
});

describe("DigitalClock - Renderizado", () => {
  test("renderiza el título 'Reloj Digital'", () => {
    render(<DigitalClock />);
    expect(screen.getByText(/Reloj Digital/i)).toBeInTheDocument();
  });

  test("muestra la hora en formato HH:MM:SS", () => {
    render(<DigitalClock />);
    const regexHora = /^\d{2}:\d{2}:\d{2}$/;
    expect(screen.getByText(regexHora)).toBeInTheDocument();
  });

  test("avanza con el tiempo simulado", () => {
    render(<DigitalClock />);
    const primerValor = screen.getByText(/^\d{2}:\d{2}:\d{2}$/).textContent;
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const nuevoValor = screen.getByText(/^\d{2}:\d{2}:\d{2}$/).textContent;
    expect(primerValor).not.toBe(nuevoValor);
    
    // avanzamos 59 segundos más
    act(() => {
      jest.advanceTimersByTime(59_000);
    });
    const clock = screen.getByTestId("digital-clock");
    expect(clock.textContent).toBe("12:01:00");
  });
});
