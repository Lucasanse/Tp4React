import { describe, it, expect } from "vitest";
import { Header } from "./Header.jsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";


beforeEach(() => {
  i18n.changeLanguage("es");
});

describe("Header", () => {
  it("Se renderizó bien", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Carga el img", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole("img", { name: "Logo de IUPI"})).toBeInTheDocument();
  });

  it("Correcto funcionamiento de los estilos", ()=>{
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const obj = screen.getByText("Inicio");
    expect(obj).toHaveClass("navlink", "navlinkCustom")
  
  })

  it("Correcto funcionamiento de las rutas", async ()=>{

    //Nota: El Click siempre es asincrono
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
        //Aca estamos diciendo que cuando la url cambie a /favoritos se renderice el div
        <Routes>
              <Route path="/favoritos" element={<div>Página Favoritos</div>} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(screen.getByText("Favoritos"))
    expect (screen.getByText("Página Favoritos")).toBeInTheDocument();
  })
});
