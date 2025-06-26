import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInGoogle from "@/features/auth/components/SignInGoogle";
import useSignInGoogle from "@/features/auth/api/use-signin-google";

vi.mock("@/features/auth/api/use-signin-google", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useSignInGoogleMock = vi.mocked(useSignInGoogle);

describe("SignInGoogle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders button", () => {
    useSignInGoogleMock.mockReturnValue({
      signInGoogle: vi.fn(),
      loading: false,
    });
    render(<SignInGoogle />);
    expect(
      screen.getByRole("button", { name: "Se connecter avec Google" }),
    ).toBeInTheDocument();
  });

  it("calls signInGoogle on click", async () => {
    const mockSignInGoogle = vi.fn();
    useSignInGoogleMock.mockReturnValue({
      signInGoogle: mockSignInGoogle,
      loading: false,
    });

    render(<SignInGoogle />);
    const button = screen.getByRole("button", {
      name: "Se connecter avec Google",
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignInGoogle).toHaveBeenCalled();
    });
  });

  it("shows loading state when loading is true", async () => {
    useSignInGoogleMock.mockReturnValue({
      signInGoogle: vi.fn(),
      loading: true,
    });

    render(<SignInGoogle />);
    const button = screen.getByRole("button", {
      name: "Redirection en cours...",
    });
    await waitFor(() => {
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
