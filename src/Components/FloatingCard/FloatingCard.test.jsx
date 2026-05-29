import FloatingCard from "./FloatingCard";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";

beforeEach(() => {
  i18n.changeLanguage("es");
});

const product = {
    "name": "Pruebita 1",
    "avatar": "https://picsum.photos/seed/ACCzQ/900/2557",
    "description": "description 2",
    "price": 39,
    "stock": 7,
    "id": "2"
  };
describe("Funcionamiento de FloatingCard", ()=>{

    it("Renderizacion correcta", ()=>{

        render(<FloatingCard product={product} />)
        expect(screen.getAllByText("Pruebita 1"))
    })
    
    it("Verificar posicion correcta", ()=>{
        
        render(<FloatingCard product={product} position={"top-[18%] left-[5%]"} />)
        const div = screen.getByRole("contenedor");
        expect(div).toHaveClass("top-[18%] left-[5%] absolute rounded-2xl px-4 py-3 backdrop-blur-md border border-white/80 bg-white fade-In-float")
    })
})