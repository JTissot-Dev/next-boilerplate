import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInFacebook from "../../components/SignInFacebook";
import useSignInFacebook from "../../api/use-signin-facebook";

vi.mock("../../api/use-signin-facebook", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useSignInFacebookMock = vi.mocked(useSignInFacebook);

describe("SignInFacebook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders button", () => {
    useSignInFacebookMock.mockReturnValue({
      signInFacebook: vi.fn(),
      loading: false,
    });
    render(<SignInFacebook />);
    expect(
      screen.getByRole("button", { name: "Se connecter avec Facebook" }),
    ).toBeInTheDocument();
  });

  it("calls signInFacebook on click", async () => {
    const mockSignInFacebook = vi.fn();
    useSignInFacebookMock.mockReturnValue({
      signInFacebook: mockSignInFacebook,
      loading: false,
    });

    render(<SignInFacebook />);
    const button = screen.getByRole("button", {
      name: "Se connecter avec Facebook",
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignInFacebook).toHaveBeenCalled();
    });
  });

  it("shows loading state when loading is true", async () => {
    useSignInFacebookMock.mockReturnValue({
      signInFacebook: vi.fn(),
      loading: true,
    });

    render(<SignInFacebook />);
    const button = screen.getByRole("button", {
      name: "Redirection en cours...",
    });
    await waitFor(() => {
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
