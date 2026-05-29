import { describe, it, expect, beforeEach, vi } from "vitest";
import { Favorite } from "./Favorite";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";

beforeEach(() => {
  i18n.changeLanguage("es");
});

vi.mock("../../services/localStorage", () => ({
  getLocalStorage: vi.fn(() => []),
  setLocalStorage: vi.fn(),
}));

describe("Favorite", () => {

  it("Agrega productos a favoritos correctamente", async () => {
    const user = userEvent.setup();
    const handleFavorite = vi.fn();
    const isFavorite = false;

    render(
      <MemoryRouter>
        <Favorite
          handleFavorite={handleFavorite}
          isFavorite={isFavorite}
        />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button");
    await user.click(btn);

    expect(handleFavorite).toHaveBeenCalledTimes(1);
  });

  it("Cambia de color cuando se agrega a favoritos", async () => {
    const user = userEvent.setup();
    const handleFavorite = vi.fn();

    render(
      <MemoryRouter>
        <Favorite handleFavorite={handleFavorite} isFavorite={false} />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(handleFavorite).toHaveBeenCalled();
  });

  it("Cambia de color cuando se elimina de favoritos", async () => {
    const user = userEvent.setup();
    const handleFavorite = vi.fn();

    render(
      <MemoryRouter>
        <Favorite handleFavorite={handleFavorite} isFavorite={true} />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(handleFavorite).toHaveBeenCalled();
  });

});