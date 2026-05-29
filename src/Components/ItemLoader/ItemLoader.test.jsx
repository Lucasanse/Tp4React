import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import ItemLoader from "./ItemLoader.jsx";
import { getProducts } from "../../services/api.js";
import "../../i18n.js";

// Se mockea la api
vi.mock("../../services/api.js", () => ({
  getProducts: vi.fn(),
}));

// Se mockea el IntersectionObserver
//los test tiran error con el scroll infinito porque el jsdom no soporta IntersectionObserver nativamente.
//Lo declaramos globalmente vacío
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(callback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ItemLoader", () => {
  // Se limpian los mocks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // datos falsos para simular lo que devolvería la API o lo que vendría en favoritos
  const productosPrueba = [
    { id: "1", name: "Pelota", price: 1000, avatar: "avatar1", stock: 5, description: "desc" },
    { id: "2", name: "Muñeca", price: 1000, avatar: "avatar2", stock: 5, description: "desc" }
  ];

  it("renderiza los productos desde la prop 'favorites' sin llamar a la API", async () => {
    render(
      <MemoryRouter>
        <ItemLoader searchQuery="" favorites={productosPrueba} setFavorites={vi.fn()} />
      </MemoryRouter>
    );
    // Aca comprobamos de que la api no fue llamada en favoritos y que las tarjetas se hayan renderizado
    expect(getProducts).not.toHaveBeenCalled();
    expect(screen.getByText("Pelota")).toBeInTheDocument();
    expect(screen.getByText("Muñeca")).toBeInTheDocument();
  });

  it("llama a la API y renderiza los productos cuando no recibe favoritos", async () => {
    //cuando sea llamado el mock tiene que devolver la lista de productos de prueba
    getProducts.mockResolvedValue(productosPrueba);

    render(
      <MemoryRouter>
        <ItemLoader searchQuery="Juguete" />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledWith("Juguete", 1, 6);
      expect(screen.getByText("Pelota")).toBeInTheDocument();
      expect(screen.getByText("Muñeca")).toBeInTheDocument();
    });
  });

  it("muestra el componente de error si la llamada a la API falla", async () => {
    // el mock simula un fallo de red o servidor
    getProducts.mockRejectedValue(new Error("Fallo de conexión"));

    render(
      <MemoryRouter>
        <ItemLoader searchQuery="" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Error: Fallo de conexión")).toBeInTheDocument();
    });
  });

  it("muestra el mensaje de ''No se encontraron productos'' cuando la API devuelve un arreglo vacío", async () => {
    getProducts.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <ItemLoader searchQuery="Inexistente" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No se encontraron productos para "Inexistente"/i)).toBeInTheDocument();
    });
  });
});