import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { ResetPasswordFormValues } from '../../hooks/use-reset-password-form';


vi.mock('../api/use-reset-password', () => ({
  default: vi.fn(() => ({
    resetPassword: vi.fn(),
    loading: false,
  })),
}));

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

const createTestForm = (defaultValues = { password: '' }) => {
  return useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};

describe('ResetPasswordForm', () => {
  const mockOnSubmit = vi.fn();
  const formId = 'test-form';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (formOverrides = {}) => {
    const TestWrapper = () => {
      const form = createTestForm();
      return (
        <ResetPasswordForm
          formId={formId}
          form={form}
          onSubmit={mockOnSubmit}
          {...formOverrides}
        />
      );
    };
    return render(<TestWrapper />);
  };

  describe('Component rendering', () => {
    it('should display the form with all required elements', () => {
      renderComponent();

      expect(screen.getByText('Nouveau mot de passe')).toBeInTheDocument();
      expect(screen.getByLabelText('Nouveau mot de passe')).toBeInTheDocument();
      expect(screen.getByText('Doit contenir au moins 6 caractères.')).toBeInTheDocument();
    });

    it('should display the correct label', () => {
      renderComponent();

      expect(screen.getByText('Nouveau mot de passe')).toBeInTheDocument();
    });

    it('should display the correct description', () => {
      renderComponent();

      expect(screen.getByText('Doit contenir au moins 6 caractères.')).toBeInTheDocument();
    });

    it('should configure the password input with correct attributes', () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Nouveau mot de passe');
      expect(passwordInput).toHaveProperty('type', 'password');
      expect(passwordInput).toHaveProperty('placeholder', '••••••••');
    });
  });

  describe('User interactions', () => {
    it('should allow entering a password', async () => {
      const user = userEvent.setup();
      renderComponent();

      const passwordInput = screen.getByLabelText('Nouveau mot de passe') as HTMLInputElement;
      await user.type(passwordInput, 'motdepasse123');

      expect(passwordInput.value).toBe('motdepasse123');
    });

    it('should call onSubmit when the form is submitted with valid data', async () => {
      const user = userEvent.setup();

      const TestWrapper = () => {
        const form = createTestForm();

        const handleSubmit = (values: ResetPasswordFormValues) => {
          mockOnSubmit(values);
        };

        return (
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ResetPasswordForm
              formId={formId}
              form={form}
              onSubmit={handleSubmit}
            />
            <button type="submit">Submit</button>
          </form>
        );
      };

      render(<TestWrapper />);

      const passwordInput = screen.getByLabelText('Nouveau mot de passe');
      const submitButton = screen.getByText('Submit');

      await user.type(passwordInput, 'motdepasse123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          password: 'motdepasse123'
        });
      });
    });
  });

  describe('Form validation', () => {
    it('should validate that the password has at least 6 characters', async () => {
      const user = userEvent.setup();

      const TestWrapper = () => {
        const form = createTestForm();

        return (
          <form onSubmit={form.handleSubmit(mockOnSubmit)}>
            <ResetPasswordForm
              formId={formId}
              form={form}
              onSubmit={mockOnSubmit}
            />
            <button type="submit">Submit</button>
            {form.formState.errors.password && (
              <div data-testid="error-message">
                {form.formState.errors.password.message}
              </div>
            )}
          </form>
        );
      };

      render(<TestWrapper />);

      const passwordInput = screen.getByLabelText('Nouveau mot de passe');
      const submitButton = screen.getByText('Submit');

      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Le mot de passe doit contenir au moins 6 caractères'
        );
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Integration with react-hook-form', () => {
    it('should use the provided form control', () => {
      const TestWrapper = () => {
        const form = createTestForm({ password: 'valeur-initiale' });

        return (
          <ResetPasswordForm
            formId={formId}
            form={form}
            onSubmit={mockOnSubmit}
          />
        );
      };

      render(<TestWrapper />);

      const passwordInput = screen.getByLabelText('Nouveau mot de passe') as HTMLInputElement;
      expect(passwordInput.value).toBe('valeur-initiale');
    });

    it('should handle value changes through react-hook-form', async () => {
      const user = userEvent.setup();

      const TestWrapper = () => {
        const form = createTestForm();

        return (
          <div>
            <ResetPasswordForm
              formId={formId}
              form={form}
              onSubmit={mockOnSubmit}
            />
            <div data-testid="current-value">
              {form.watch('password')}
            </div>
          </div>
        );
      };

      render(<TestWrapper />);

      const passwordInput = screen.getByLabelText('Nouveau mot de passe');
      await user.type(passwordInput, 'nouveau-mot-de-passe');

      await waitFor(() => {
        expect(screen.getByTestId('current-value')).toHaveTextContent('nouveau-mot-de-passe');
      });
    });
  });

  describe('Validation error handling', () => {
    it('should handle empty password inputs', async () => {
      const user = userEvent.setup();

      const TestWrapper = () => {
        const form = createTestForm();

        return (
          <form onSubmit={form.handleSubmit(mockOnSubmit)}>
            <ResetPasswordForm
              formId={formId}
              form={form}
              onSubmit={mockOnSubmit}
            />
            <button type="submit">Submit</button>
            {form.formState.errors.password && (
              <div data-testid="error-message">
                {form.formState.errors.password.message}
              </div>
            )}
          </form>
        );
      };

      render(<TestWrapper />);

      const submitButton = screen.getByText('Submit');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Le mot de passe doit contenir au moins 6 caractères'
        );
      });
    });

    it('should clear the error once a valid password is entered', async () => {
      const user = userEvent.setup();

      const TestWrapper = () => {
        const form = createTestForm();

        return (
          <form onSubmit={form.handleSubmit(mockOnSubmit)}>
            <ResetPasswordForm
              formId={formId}
              form={form}
              onSubmit={mockOnSubmit}
            />
            <button type="submit">Submit</button>
            {form.formState.errors.password && (
              <div data-testid="error-message">
                {form.formState.errors.password.message}
              </div>
            )}
          </form>
        );
      };

      render(<TestWrapper />);

      const passwordInput = screen.getByLabelText('Nouveau mot de passe');
      const submitButton = screen.getByText('Submit');

      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });

      await user.clear(passwordInput);
      await user.type(passwordInput, 'motdepasse123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      });
    });
  });
});
