import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "../../components/PasswordInput";

describe("PasswordInput", () => {
  it("renders correctly with default props", () => {
    render(<PasswordInput />);
    const input = screen.getByPlaceholderText("••••••••••");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("toggles password visibility when button is clicked", () => {
    render(<PasswordInput />);
    const toggleButton = screen.getByTestId("toggle-password");

    const input = screen.getByPlaceholderText("••••••••••");
    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });
});
