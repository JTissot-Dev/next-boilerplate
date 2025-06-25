import ResetPasswordCard from "../../components/ResetPasswordCard";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";

const mockOnSubmit = vi.fn();

let mockHandleSubmit = vi.fn((onValid) => (e: any) => {
  e.preventDefault();
  onValid({ password: "testPassword" });
});

let mockLoading = false;

vi.mock("../../hooks/use-reset-password-form", () => {
  return {
    __esModule: true,
    default: () => ({
      form: {
        ...useForm(),
        handleSubmit: mockHandleSubmit,
      },
      onSubmit: mockOnSubmit,
      loading: mockLoading,
    }),
  };
});

describe("ResetPasswordCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the ResetPasswordCard component", () => {
    render(<ResetPasswordCard />);
    const title = screen.getByText("Réinitialiser votre mot de passe");
    const description = screen.getByText(
      "Veuillez saisir votre nouveau mot de passe pour continuer.",
    );
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("submit form on validation with valid input", () => {
    render(<ResetPasswordCard />);
    const button = screen.getByRole("button", { name: "Valider" });
    fireEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledWith({ password: "testPassword" });
  });

  it("didn't submit form on validation with invalid input", () => {
    mockHandleSubmit = vi.fn((_onValid: any, onInvalid: any) => (e: any) => {
      e.preventDefault();
      if (onInvalid) {
        const errors = {
          password: {
            type: "minLength",
            message: "Le mot de passe doit contenir au moins 6 caractères",
          },
        };
        onInvalid(errors);
      }
    });
    render(<ResetPasswordCard />);
    const button = screen.getByRole("button", { name: "Valider" });
    fireEvent.click(button);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows loading state when loading is true", () => {
    mockLoading = true;
    render(<ResetPasswordCard />);
    const button = screen.getByRole("button", {
      name: "Chargement en cours...",
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
