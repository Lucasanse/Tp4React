import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { ItemCard } from "./ItemCard";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";
import { getProducts } from "../../services/api";

beforeEach(() => {
  i18n.changeLanguage("es");
});

let mockImg = []

beforeAll(async () => {
  mockImg = await getProducts("", 1, 1)[0]?.avatar;
});

// Producto de ejemplo reutilizable en tests
const mockProduct = {
  id: "1",
  name: "Oriental Marble Towels",
  avatar: mockImg,
  description: "A nice towel",
  price: 29.99,
  stock: 10,
  setFavorites: vi.fn(), // evita crash en handleFavorite
};

describe("ItemCard", () => {
  let productsTesting = [];

  beforeAll(async () => {
    productsTesting = await getProducts("", 1, 64);
  });

  it("Se renderizó bien con productos reales", () => {
    render(
      <MemoryRouter>
        {productsTesting.map((item) => (
          <div key={item.id}>
            <ItemCard {...item} setFavorites={vi.fn()} />
          </div>
        ))}
      </MemoryRouter>,
    );
    // Verifica que al menos una imagen de producto se renderizó
    const images = screen.getAllByAltText("Product");
    expect(images.length).toBeGreaterThan(0);
    console.log(images[0]);
  });

  it("Renderiza el nombre del producto correctamente", () => {
    render(
      <MemoryRouter>
        <ItemCard {...mockProduct} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Oriental Marble Towels")).toBeInTheDocument();
  });

  it("Correcto funcionamiento de los estilos", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ItemCard {...mockProduct} />
      </MemoryRouter>,
    );
    const card = screen.getByText("Oriental Marble Towels").closest("div.relative");
    expect(card).toHaveClass("relative", "w-72", "bg-white");
  });
});