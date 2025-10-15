import { render, screen, fireEvent, act } from "@testing-library/react";
import CountdownTimer from "./CountdownTimer";
import "@testing-library/jest-dom";

describe("CountdownTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("muestra el tiempo inicial correctamente", () => {
    render(<CountdownTimer />);
    const timer = screen.getByTestId("countdown-timer");
    expect(timer.textContent).toBe("--:--:--");
    const input = screen.getByTestId("input-time");
    fireEvent.change(input, { target: { value: "00:00:05" } });
    expect(input).toHaveValue("00:00:05");
  });

  test("disminuye en intervalos de un segundo con formato HH:MM:SS", () => {
    render(<CountdownTimer />);
    const input = screen.getByTestId("input-time");
    fireEvent.change(input, { target: { value: "00:00:03" } });
    const btn = screen.getByTestId("start-btn");
    fireEvent.click(btn);
    const timer = screen.getByTestId("countdown-timer");
    expect(timer.textContent).toBe("00:00:03");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer.textContent).toBe("00:00:02");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer.textContent).toBe("00:00:01");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer.textContent).toBe("00:00:00");
  });

  test("se detiene en 0", () => {
    render(<CountdownTimer />);
    const input = screen.getByTestId("input-time");
    fireEvent.change(input, { target: { value: "00:00:02" } });
    const btn = screen.getByTestId("start-btn");
    fireEvent.click(btn);
    const timer = screen.getByTestId("countdown-timer");
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(timer.textContent).toBe("00:00:00");
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(timer.textContent).toBe("00:00:00");
  });

  test("funciona correctamente con formato HH:MM", () => {
    render(<CountdownTimer />);
    const input = screen.getByTestId("input-time");
    fireEvent.change(input, { target: { value: "00:02" } });
    const btn = screen.getByTestId("start-btn");
    fireEvent.click(btn);
    const timer = screen.getByTestId("countdown-timer");
    expect(timer.textContent).toBe("00:02");
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(timer.textContent).toBe("00:01");
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(timer.textContent).toBe("00:00");
  });

  test("muestra placeholder correcto inicialmente para formato HH:MM", () => {
    render(<CountdownTimer />);
    const input = screen.getByTestId("input-time");
    fireEvent.change(input, { target: { value: "00:01" } });
    const timer = screen.getByTestId("countdown-timer");
    expect(timer.textContent).toBe("--:--");
  });
});
