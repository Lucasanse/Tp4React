import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";
import { Footer } from "./Footer";

beforeEach(() => {
  i18n.changeLanguage("es");
});


describe("Testeo de funcionamiento de Footer", ()=>{

    it("Correcta renderizacion", ()=>{

        render(<Footer/>)
        expect(screen.getByText("Lian Ivan Sinchez"))
    })

    it("Correcto funcionamiento de estilos (Tailwind)", ()=>{

        render(<Footer/>)
        const nombre =  screen.getByText("Lian Ivan Sinchez");
        expect(nombre).toHaveClass("text-lg w-xl px-4 py-2 rounded-lg bg-white border-l-4 border-purple-400 shadow hover:scale-105 hover:border-pink-400 transition-transform duration-200");
    })
})