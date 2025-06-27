import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import SignupForm from "@/features/auth/components/SignupForm";

let mockHandleSubmit = vi.fn((onValid) => (e: any) => {
  e.preventDefault();
  onValid({
    name: "John Doe",
    email: "test@example.fr",
    password: "password123",
  });
});

const mockOnSubmit = vi.fn();
let mockLoading = false;

vi.mock("@/features/auth/hooks/use-signup-form", () => {
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

describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with all required elements", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByText("Votre nom d'utilisateur.")).toBeInTheDocument();
    expect(
      screen.getByText("L'adresse email utilisée pour se connecter."),
    ).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when form is submitted", async () => {
    render(<SignupForm />);

    const nameInput = screen.getByLabelText("Nom");
    const emailInput = screen.getByLabelText("Adresse email");
    const passwordInput = screen.getByLabelText("Mot de passe");
    const submitButton = screen.getByRole("button", { name: "S'inscrire" });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.fr" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.fr",
        password: "password123",
      });
    });
  });

  it("shows loading state when loading is true", () => {
    mockLoading = true;
    render(<SignupForm />);
    const button = screen.getByRole("button", {
      name: "Création du compte...",
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
