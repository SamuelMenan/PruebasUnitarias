import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "./ColorPicker";
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe("ColorPicker", () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  test("muestra el color inicial como blanco", () => {
    // Mock para que localStorage devuelva null (sin valor guardado)
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    const colorDiv = screen.getByTestId("color-div");
    const colorText = screen.getByText("Color actual: #ffffff");
    
    expect(colorInput).toHaveValue("#ffffff");
    expect(colorDiv).toHaveStyle("background-color: rgb(255, 255, 255)");
    expect(colorText).toBeInTheDocument();
  });

  test("actualiza el div al seleccionar un nuevo color", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    const colorDiv = screen.getByTestId("color-div");
    
    // Cambiar el color a rojo
    fireEvent.change(colorInput, { target: { value: "#ff0000" } });
    
    expect(colorInput).toHaveValue("#ff0000");
    expect(colorDiv).toHaveStyle("background-color: rgb(255, 0, 0)");
    expect(screen.getByText("Color actual: #ff0000")).toBeInTheDocument();
  });

  test("actualiza el texto del color actual al cambiar el color", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    
    // Cambiar el color a azul
    fireEvent.change(colorInput, { target: { value: "#0000ff" } });
    
    expect(screen.getByText("Color actual: #0000ff")).toBeInTheDocument();
    expect(screen.queryByText("Color actual: #ffffff")).not.toBeInTheDocument();
  });

  test("guarda el color en localStorage al cambiar", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    
    // Cambiar el color
    fireEvent.change(colorInput, { target: { value: "#00ff00" } });
    
    // Verificar que se llamó setItem con la clave y valor correctos
    expect(localStorageMock.setItem).toHaveBeenCalledWith("colorPickerColor", "#00ff00");
  });

  test("carga el color guardado desde localStorage al inicializar", () => {
    // Mock para que localStorage devuelva un color guardado
    localStorageMock.getItem.mockReturnValue("#ff00ff");
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    const colorDiv = screen.getByTestId("color-div");
    
    // Verificar que se cargó el color desde localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith("colorPickerColor");
    expect(colorInput).toHaveValue("#ff00ff");
    expect(colorDiv).toHaveStyle("background-color: rgb(255, 0, 255)");
    expect(screen.getByText("Color actual: #ff00ff")).toBeInTheDocument();
  });

  test("guarda el color inicial en localStorage si no hay color guardado", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    // Verificar que se guardó el color inicial
    expect(localStorageMock.setItem).toHaveBeenCalledWith("colorPickerColor", "#ffffff");
  });

  test("maneja múltiples cambios de color correctamente", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<ColorPicker />);
    
    const colorInput = screen.getByTestId("color-input");
    const colorDiv = screen.getByTestId("color-div");
    
    // Primer cambio
    fireEvent.change(colorInput, { target: { value: "#ff0000" } });
    expect(colorDiv).toHaveStyle("background-color: rgb(255, 0, 0)");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("colorPickerColor", "#ff0000");
    
    // Segundo cambio
    fireEvent.change(colorInput, { target: { value: "#00ff00" } });
    expect(colorDiv).toHaveStyle("background-color: rgb(0, 255, 0)");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("colorPickerColor", "#00ff00");
    
    // Tercer cambio
    fireEvent.change(colorInput, { target: { value: "#0000ff" } });
    expect(colorDiv).toHaveStyle("background-color: rgb(0, 0, 255)");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("colorPickerColor", "#0000ff");
  });
});