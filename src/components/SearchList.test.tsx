import { render, screen, fireEvent } from "@testing-library/react";
import SearchList from "./SearchList";
import "@testing-library/jest-dom";

describe("SearchList", () => {
  test("lista inicial muestra todos los elementos", () => {
    render(<SearchList />);
    const list = screen.getByTestId("name-list");
    expect(list.children.length).toBeGreaterThan(1); // Hay varios nombres
    expect(list.textContent).toContain("Ana");
    expect(list.textContent).toContain("Valentina");
  });

  test("al escribir, se filtran los nombres que coincidan", () => {
    render(<SearchList />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "an" } });
    const list = screen.getByTestId("name-list");
    expect(list.textContent).toContain("Ana");
    expect(list.textContent).toContain("Juan");
    expect(list.textContent).not.toContain("Luis");
  });

  test("si no hay coincidencias, se muestra 'No encontrado'", () => {
    render(<SearchList />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "zzz" } });
    const list = screen.getByTestId("name-list");
    expect(list.textContent).toContain("No encontrado");
  });
});
