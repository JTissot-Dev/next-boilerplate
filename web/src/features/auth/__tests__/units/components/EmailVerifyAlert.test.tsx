import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmailVerifyAlert from "@/features/auth/components/EmailVerifyAlert";

describe("EmailVerifyAlert", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders alert when showAlert is true", () => {
    const setShowAlert = vi.fn();
    render(<EmailVerifyAlert showAlert={true} setShowAlert={setShowAlert} />);
    expect(screen.getByText("Adresse email vérifiée.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Votre adresse email a bien été vérifiée, vous pouvez désormais vous connecté.",
      ),
    ).toBeInTheDocument();
  });

  it("renders nothing when showAlert is false", () => {
    const setShowAlert = vi.fn();
    render(<EmailVerifyAlert showAlert={false} setShowAlert={setShowAlert} />);
    expect(
      screen.queryByText("Adresse email vérifiée."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Votre adresse email a bien été vérifiée, vous pouvez désormais vous connecté.",
      ),
    ).not.toBeInTheDocument();
  });
});
