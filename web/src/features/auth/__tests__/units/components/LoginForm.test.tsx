import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/features/auth/components/LoginForm";
import { useForm } from "react-hook-form";

const mockOnSubmit = vi.fn();

let mockHandleSubmit = vi.fn((onValid) => (e: any) => {
  e.preventDefault();
  onValid({ email: "test@example.com", password: "testPassword" });
});

vi.mock("@/features/auth/hooks/use-login-form", () => {
  return {
    __esModule: true,
    default: () => ({
      form: {
        ...useForm(),
        handleSubmit: mockHandleSubmit,
      },
      onSubmit: mockOnSubmit,
      loading: false,
    }),
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Render Login Form correctly", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { name: "Se connecter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accédez à votre espace personnel"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByText("Mot de passe oublié?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Se connecter" }),
    ).toBeInTheDocument();
  });

  it("Submit form with valid data", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Adresse email");
    const passwordInput = screen.getByLabelText("Mot de passe");
    const submitButton = screen.getByRole("button", { name: "Se connecter" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "testPassword",
    });
  });

  it("Submit form with invalid data", () => {
    mockHandleSubmit = vi.fn((_onValid: any, onInvalid: any) => (e: any) => {
      e.preventDefault();
      if (onInvalid) {
        const errors = {
          email: { type: "required", message: "Email invalide" },
          password: {
            type: "minLength",
            message: "Le mot de passe doit contenir au moins 6 caractères",
          },
        };
        onInvalid(errors);
      }
    });

    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Se connecter" });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
