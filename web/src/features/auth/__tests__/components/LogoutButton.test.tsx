import LogoutButton from "../../components/LogoutButton";

import { render, screen, fireEvent } from "@testing-library/react";

const mockSignOut = vi.fn();

vi.mock("../../api/use-signout", () => ({
  __esModule: true,
  default: () => ({
    signOut: mockSignOut,
  }),
}));

describe("LogoutButton", () => {
  it("renders the logout button", () => {
    render(<LogoutButton />);
    const button = screen.getByTestId("logout-button");
    expect(button).toBeInTheDocument();
  });

  it("opens the confirmation dialog on button click", () => {
    render(<LogoutButton />);
    const button = screen.getByTestId("logout-button");
    fireEvent.click(button);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("call signout on confirm", () => {
    render(<LogoutButton />);
    const button = screen.getByTestId("logout-button");
    fireEvent.click(button);
    const confirmButton = screen.getByRole("button", { name: "Confirmer" });
    fireEvent.click(confirmButton);
    expect(mockSignOut).toHaveBeenCalled();
  });
});