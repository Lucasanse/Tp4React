import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar.jsx";
import "../../i18n.js"; 

describe("SearchBar", () => {
  
  it("renderiza correctamente el input con el placeholder", () => {

    render(<SearchBar searchQuery="" setSearchQuery={vi.fn()} />);
    expect(screen.getByPlaceholderText("Busca un articulo...")).toBeInTheDocument();

  });

  
  it("permite escribir en el input y actualiza su valor visual", async () => {
    const user = userEvent.setup();
    render(<SearchBar searchQuery="" setSearchQuery={vi.fn()} />);
    const input = screen.getByRole("textbox");

    // Acá simulo escribir "Oriental" tecla por tecla por la mockapi que tenemos.
    await user.type(input, "Oriental");
    expect(input).toHaveValue("Oriental");
  });

  it("llama a setSearchQuery con el valor correcto luego del delay", async () => {
    // Se crea una funcion espía para poder rastrear si fue llamada y con qué argumentos.
    const mockSetSearchQuery = vi.fn();
    const user = userEvent.setup();
    
    // se renderiza pasándole el espía a la prop 'setSearchQuery'.
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Oriental");
    
    // Lo que pasa acá es que, cuando tipeamos en el componente tenemos un timeout de 300ms 
    // En vez de llamarlo de una, se usa el 'waitFor' para que el test espere hasta que:
    // la condición se cumpla o que termine el tiempo límite.
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("Oriental");
    });

  });

  it("muestra el componente de error cuando la prop noResults es true", () => {

    render(<SearchBar searchQuery="" setSearchQuery={vi.fn()} noResults={true} />);
    expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument();
  });
});