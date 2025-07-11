import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SendResetPasswordForm from "@/features/auth/components/SendResetPasswordForm";
import useSendResetPasswordForm from "@/features/auth/hooks/use-send-reset-password-form";

const mockOnSubmit = vi.fn();
const mockSetIsOpenDialog = vi.fn();

const formId = "send-reset-password-form";
describe("SendResetPasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with all required elements", () => {
    const TestWrapper = () => {
      const { form } = useSendResetPasswordForm();
      return (
        <SendResetPasswordForm
          formId={formId}
          form={form}
          onSubmit={mockOnSubmit}
          setIsOpenDialog={mockSetIsOpenDialog}
        />
      );
    };

    render(<TestWrapper />);

    expect(screen.getByLabelText("Adresse email")).toBeInTheDocument();
    expect(
      screen.getByText("L'adresse email de votre compte."),
    ).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when form is submitted", async () => {
    const TestWrapper = () => {
      const { form } = useSendResetPasswordForm();
      return (
        <SendResetPasswordForm
          formId={formId}
          form={form}
          onSubmit={mockOnSubmit}
          setIsOpenDialog={mockSetIsOpenDialog}
        />
      );
    };

    render(<TestWrapper />);

    const emailInput = screen.getByLabelText("Adresse email");
    const form = screen.getByTestId(formId);

    fireEvent.change(emailInput, { target: { value: "test@example.fr" } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({ email: "test@example.fr" });
      expect(mockSetIsOpenDialog).toHaveBeenCalledWith(false);
    });
  });

  it("not calls onSubmit when form is submitted with empty email", async () => {
    const TestWrapper = () => {
      const { form } = useSendResetPasswordForm();
      return (
        <SendResetPasswordForm
          formId={formId}
          form={form}
          onSubmit={mockOnSubmit}
          setIsOpenDialog={mockSetIsOpenDialog}
        />
      );
    };

    render(<TestWrapper />);

    const emailInput = screen.getByLabelText("Adresse email");
    const form = screen.getByTestId(formId);

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(mockSetIsOpenDialog).not.toHaveBeenCalled();
    });
  });
});
