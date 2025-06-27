import SendResetPasswordDialog from "@/features/auth/components/SendResetPasswordDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";

let mockHandleSubmit = vi.fn((onValid) => (e: any) => {
  e.preventDefault();
  onValid({ email: "test@example.fr" });
});

const mockOnSubmit = vi.fn();
let mockLoading = false;

vi.mock("@/features/auth/hooks/use-send-reset-password-form", () => {
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

describe("SendResetPasswordDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when open state is false", () => {
    const { container } = render(
      <SendResetPasswordDialog
        isOpenDialog={false}
        setIsOpenDialog={vi.fn()}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders correctly when open state is true", () => {
    render(
      <SendResetPasswordDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />,
    );
    expect(
      screen.getByRole("heading", { name: "Réinitialisé votre mot de passe." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Recevoir un lien par mail pour la mise à jour de votre mot de passe.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
    expect(screen.getByTestId("send-reset-password-form")).toBeInTheDocument();
  });

  it("renders loading button when loading state is true", () => {
    mockLoading = true;
    render(
      <SendResetPasswordDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />,
    );
    const button = screen.getByRole("button", { name: "Envoi en cours..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("calls onSubmit with correct values when form is submitted", async () => {
    mockLoading = false;

    render(
      <SendResetPasswordDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />,
    );

    const emailInput = screen.getByLabelText("Adresse email");
    const submitButton = screen.getByRole("button", { name: "Envoyer" });
    fireEvent.change(emailInput, { target: { value: "test@example.fr" } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith({ email: "test@example.fr" });
  });

  it("not calls onSubmit when form is submitted with empty email", async () => {
    mockHandleSubmit = vi.fn((_onValid: any, onInvalid: any) => (e: any) => {
      e.preventDefault();
      if (onInvalid) {
        const errors = {
          email: {
            type: "email",
            message: "Email invalide",
          },
        };
        onInvalid(errors);
      }
    });
    render(
      <SendResetPasswordDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />,
    );

    const emailInput = screen.getByLabelText("Adresse email");
    const submitButton = screen.getByRole("button", { name: "Envoyer" });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
