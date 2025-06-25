import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import VerifyEmailDialog from "../../components/VerifyEmailDialog";

let mockHandleSubmit = vi.fn((onValid) => (e: any) => {
  e.preventDefault();
  onValid({ email: "test@example.fr" });
});

const mockOnSubmit = vi.fn();
let mockLoading = false;

vi.mock("../../hooks/use-verify-email-form", () => {
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

describe("VerifyEmailDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when dialog is closed", () => {
    render(
      <VerifyEmailDialog isOpenDialog={false} setIsOpenDialog={vi.fn()} />,
    );
    expect(
      screen.queryByText("Vérifier votre adresse."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Recevoir un lien par mail pour la vérification de votre adresse.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Envoyer" }),
    ).not.toBeInTheDocument();
  });

  it("renders the dialog with all required elements", () => {
    render(<VerifyEmailDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />);

    expect(screen.getByText("Vérifier votre adresse.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Recevoir un lien par mail pour la vérification de votre adresse.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when form is submitted", async () => {
    render(<VerifyEmailDialog isOpenDialog={true} setIsOpenDialog={vi.fn()} />);

    const emailInput = screen.getByLabelText("Adresse email");
    const submitButton = screen.getByRole("button", { name: "Envoyer" });

    fireEvent.change(emailInput, { target: { value: "test@example.fr" } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith({ email: "test@example.fr" });
  });
});
