import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Spinner from "./Spinner.jsx";

describe("Spinner", () => {
  it(" el spinner se renderiza correctamente con su animación", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
    //se verifica el comportamiento visual buscando la clase de Tailwind
    const elementosGiratorios = container.getElementsByClassName("animate-spin");
    expect(elementosGiratorios.length).toBeGreaterThan(0);
  });
});