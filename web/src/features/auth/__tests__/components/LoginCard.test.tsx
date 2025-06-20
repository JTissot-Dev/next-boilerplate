import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginCard from "../../components/LoginCard";
import React from "react";

// Mock dependencies
vi.mock("../../context", () => ({
  useAuthContext: () => ({
    showEmailNotVerifyAlert: false,
    setEmailNotVerifyAlert: vi.fn(),
    showEmailVerifyAlert: false,
    setEmailVerifyAlert: vi.fn(),
    isOpenSendResetPasswordDialog: false,
    setIsOpenSendResetPasswordDialog: vi.fn(),
  }),
}));

vi.mock("../../components/EmailNotVerifyAlert", () => ({
  __esModule: true,
  default: ({ showAlert }: { showAlert: boolean }) => (
    <div data-testid="email-not-verify-alert">
      {showAlert ? "Show" : "Hide"}
    </div>
  ),
}));

vi.mock("../../components/EmailVerifyAlert", () => ({
  __esModule: true,
  default: ({ showAlert }: { showAlert: boolean }) => (
    <div data-testid="email-verify-alert">{showAlert ? "Show" : "Hide"}</div>
  ),
}));

vi.mock("../../components/SendResetPasswordDialog", () => ({
  __esModule: true,
  default: ({ isOpenDialog }: { isOpenDialog: boolean }) => (
    <div data-testid="send-reset-password-dialog">
      {isOpenDialog ? "Open" : "Closed"}
    </div>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => (
    <img {...props} alt={props.alt} data-testid="next-image" />
  ),
}));

describe("LoginCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <LoginCard>
        <span>Test Child</span>
      </LoginCard>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders EmailNotVerifyAlert, EmailVerifyAlert, and SendResetPasswordDialog", () => {
    render(
      <LoginCard>
        <span>Child</span>
      </LoginCard>,
    );
    expect(screen.getByTestId("email-not-verify-alert")).toBeInTheDocument();
    expect(screen.getByTestId("email-verify-alert")).toBeInTheDocument();
    expect(
      screen.getByTestId("send-reset-password-dialog"),
    ).toBeInTheDocument();
  });

  it("renders the Card and CardContent structure", () => {
    render(
      <LoginCard>
        <span>Child</span>
      </LoginCard>,
    );
    // CardContent is a div with class "grid p-0 md:grid-cols-2"
    expect(
      screen.getByText("Child").closest(".flex.px-6.w-full"),
    ).toBeInTheDocument();
  });

  it("renders the next/image with correct props", () => {
    render(
      <LoginCard>
        <span>Child</span>
      </LoginCard>,
    );
    const img = screen.getByTestId("next-image");
    expect(img).toHaveAttribute("src", "/auth.jpg");
    expect(img).toHaveAttribute("alt", "Image");
    expect(img).toHaveAttribute("width", "600");
    expect(img).toHaveAttribute("height", "1000");
  });
});
