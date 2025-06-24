import { render, screen } from "@testing-library/react";
import PasswordStrengthIndicator from "../../components/PasswordStrenghtIndicator";

describe("PasswordStrengthIndicator", () => {
  it("renders default password strenght bar without focus", () => {
    render(<PasswordStrengthIndicator password="" focus={false} />);
    const strengthText = screen.getByText("Robustesse");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("renders default password strenght bar with focus", () => {
    render(<PasswordStrengthIndicator password="" focus={true} />);
    const strengthText = screen.getByText("Robustesse");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Très faible' indicator without password feedback", () => {
    render(<PasswordStrengthIndicator password="test" focus={false} />);
    const strengthText = screen.getByText("Très faible");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Très faible' indicator with password feedback", () => {
    render(<PasswordStrengthIndicator password="test" focus={true} />);
    const strengthText = screen.getByText("Très faible");
    const passwordFeedback = screen.getByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).toBeInTheDocument();
  });

  it("shows password strenght bar with 'Faible' indicator without password feedback", () => {
    render(<PasswordStrengthIndicator password="Test" focus={false} />);
    const strengthText = screen.getByText("Faible");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Faible' indicator with password feedback", () => {
    render(<PasswordStrengthIndicator password="Test" focus={true} />);
    const strengthText = screen.getByText("Faible");
    const passwordFeedback = screen.getByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).toBeInTheDocument();
  });

  it("shows password strenght bar with 'Moyen' indicator without password feedback", () => {
    render(<PasswordStrengthIndicator password="Test69" focus={false} />);
    const strengthText = screen.getByText("Moyen");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Moyen' indicator with password feedback", () => {
    render(<PasswordStrengthIndicator password="Test69" focus={true} />);
    const strengthText = screen.getByText("Moyen");
    const passwordFeedback = screen.getByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).toBeInTheDocument();
  });

  it("shows password strenght bar with 'Fort' indicator without password feedback", () => {
    render(<PasswordStrengthIndicator password="Test69300" focus={false} />);
    const strengthText = screen.getByText("Fort");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Fort' indicator with password feedback", () => {
    render(<PasswordStrengthIndicator password="Test69300" focus={true} />);
    const strengthText = screen.getByText("Fort");
    const passwordFeedback = screen.getByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).toBeInTheDocument();
  });

  it("shows password strenght bar with 'Très fort' indicator without focus", () => {
    render(<PasswordStrengthIndicator password="Test69300*" focus={false} />);
    const strengthText = screen.getByText("Très fort");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

  it("shows password strenght bar with 'Très fort' indicator with focus", () => {
    render(<PasswordStrengthIndicator password="Test69300*" focus={true} />);
    const strengthText = screen.getByText("Très fort");
    const passwordFeedback = screen.queryByTestId("password-strength-feedback");
    expect(strengthText).toBeInTheDocument();
    expect(passwordFeedback).not.toBeInTheDocument();
  });

});