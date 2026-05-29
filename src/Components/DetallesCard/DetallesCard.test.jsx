import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";
import DetallesCard from "./DetallesCard";

beforeEach(() => {
  i18n.changeLanguage("es");
});

const product = [
  {
    name: "Pruebita 1",
    avatar: "https://picsum.photos/seed/ACCzQ/900/2557",
    description: "description 2",
    price: 39,
    stock: 7,
    id: 2,
  },
];

describe("Testeo del componente DetallesCard", () => {
  it("Renderizacion correcta", () => {
    render(<DetallesCard item={product} />);
    expect(screen.getByText("En venta"));
  });

  it("Testeo de estilos tailwind", () => {
    render(<DetallesCard item={product} />);
    expect(screen.getByText("En venta")).toHaveClass(
      "flex-1 pl-5 text-center text-2xl title-font text-gray-500 tracking-widest leading-none",
    );
  });

  it("Testeo de carga correcta de objeto", () => {
    render(<DetallesCard item={product} />);
    expect(screen.getByText("Pruebita 1"));
  });

  it("Testeo de favorito", () => {
    vi.mock("../../services/localStorage", () => ({
      getLocalStorage: vi.fn(() => [{ id: 2 }]),
    }));

    render(<DetallesCard item={product} />);
    expect(screen.getByAltText("Favorito"));
  });
  
});
