import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "./LanguageSwitcher.jsx";
import { useLanguage } from "../../Hooks/useLanguage.jsx";

//mockeamos el hook
vi.mock("../../Hooks/useLanguage.jsx", () => ({
  useLanguage: vi.fn()
}));

//limpiamos los mocks
describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el componente con las opciones y el idioma actual", () => {
    // seteamos el mock en "es"
    useLanguage.mockReturnValue({
      language: "es",
      changeLanguage: vi.fn()
    });

    render(<LanguageSwitcher />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("es");
    expect(screen.getByRole("option", { name: "Español" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Inglés" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Guaraní" })).toBeInTheDocument();
  });

  it("podemos cambiar de lenguaje al seleccionar un nuevo idioma", async () => {
    //usamos mockChangeLanguage para rastrear si el componente intenta cambiar el idioma
    const mockChangeLanguage = vi.fn();

    useLanguage.mockReturnValue({
      language: "es", 
      changeLanguage: mockChangeLanguage
    });

    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "en");
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });
});
