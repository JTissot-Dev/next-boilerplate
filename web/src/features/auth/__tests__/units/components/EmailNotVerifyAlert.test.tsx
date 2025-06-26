import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmailNotVerifyAlert from "@/features/auth/components/EmailNotVerifyAlert";

describe("EmailNotVerifyAlert", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders alert when showAlert is true", () => {
    const setShowAlert = vi.fn();
    render(
      <EmailNotVerifyAlert showAlert={true} setShowAlert={setShowAlert} />,
    );
    expect(screen.getByText("Vérifiez votre email.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Un email de vérification a été envoyé à votre adresse.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Renvoyer l'email de vérification." }),
    ).toBeInTheDocument();
  });

  it("renders nothing when showAlert is false", () => {
    const setShowAlert = vi.fn();
    render(
      <EmailNotVerifyAlert showAlert={false} setShowAlert={setShowAlert} />,
    );
    expect(screen.queryByText("Vérifiez votre email.")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Un email de vérification a été envoyé à votre adresse.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Renvoyer l'email de vérification.",
      }),
    ).not.toBeInTheDocument();
  });
});
