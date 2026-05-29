import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";
import ErrorComponent from "./ErrorComponent";

beforeEach(() => {
  i18n.changeLanguage("es");
});

describe("Correcto funcionamiento del componente de error", ()=> {

    it("Renderizacion correcta con todas las props", ()=>{

        
        render(<ErrorComponent message={"Prueba"} type={"error"}/>)
        expect(screen.getByText(`Error: Prueba`)).toBeInTheDocument();
    })
    it("Renderizacion correcta sin segunda prop", ()=>{

        render(<ErrorComponent message={"Prueba"}/>)
        expect(screen.getByText(`No se encontraron productos para "Prueba"`))
    })
    
    it("Estilos correctos", ()=>{
        
        
        render(<ErrorComponent message={"Prueba"}/>)
        const texto = screen.getByText(`No se encontraron productos para "Prueba"`)
        expect(texto).toHaveClass("col-span-3 text-center text-gray-500 my-4") 
    })
})