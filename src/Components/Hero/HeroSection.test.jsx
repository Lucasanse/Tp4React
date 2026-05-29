import { describe, it, expect, vi } from "vitest";
import HeroSection from "./HeroSection.jsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";

beforeEach(() => {
  i18n.changeLanguage("es");
});

//Hacemos que cada vez que se importe la funcion getProducts en el componente se reemplace con 
//con un getProducts modificado con lo que queremos devolver. En este caso, una lista.
vi.mock("../../services/api", () => ({
  getProducts: vi.fn().mockResolvedValue([
    {
    "name": "Pruebita 1",
    "avatar": "https://picsum.photos/seed/ACCzQ/900/2557",
    "description": "description 2",
    "price": 39,
    "stock": 7,
    "id": "2"
  },
    {
    "name": "Pruebita 2",
    "avatar": "https://picsum.photos/seed/ACCzQ/900/2557",
    "description": "description 2",
    "price": 39,
    "stock": 7,
    "id": "3"
  },
    {
    "name": "Pruebita 3",
    "avatar": "https://picsum.photos/seed/ACCzQ/900/2557",
    "description": "description 2",
    "price": 39,
    "stock": 7,
    "id": "4"
  },
    {
    "name": "Pruebita 4",
    "avatar": "https://picsum.photos/seed/ACCzQ/900/2557",
    "description": "description 2",
    "price": 39,
    "stock": 7,
    "id": "5"
  },
  ])
}));

describe("Hero Section", () => {
  it("Renderizacion de la seccion", () => {
    render(<HeroSection></HeroSection>);
    expect(screen.getByText("Todo lo que querés,")).toBeInTheDocument();
  });

  it("Prueba de boton Explorar mas", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<HeroSection handleScroll={onClick}></HeroSection>);
    const button = screen.getByRole("button", { name: "Explorar productos" });
    await user.click(button);
    expect(onClick).toHaveBeenCalled(1);
  });

  it("Correcto funcionamiento de los estilos", () => {
    render(<HeroSection></HeroSection>);
    const obj = screen.getByText(
      "IUPI no es solo un microemprendimiento… ¡es una fábrica de ideas divertidas!",
    );
    expect(obj).toHaveClass(
      "fade-up fade-up-d3 text-[17px] font-light leading-relaxed max-w-xl mx-auto mb-10",
    );
  });
  it("Carga de productos correctamente", ()=> {

    render(<HeroSection></HeroSection>);
    expect(screen.getByText("Pruebita 1")).toBeInTheDocument();
    expect(screen.getByText("Pruebita 2")).toBeInTheDocument();
  })
});
