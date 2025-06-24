import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import useSendResetPasswordEmail from '../../api/use-send-reset-password-email';
import useSendResetPasswordForm from '../../hooks/use-send-reset-password-form';


vi.mock("next/navigation", () => {
  return {
    useSearchParams: vi.fn(),
    useRouter: () => ({ push: vi.fn() }),
  };
});

vi.mock('../../api/use-send-reset-password-email', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useSearchParamsMock = vi.mocked(useSearchParams);
const useSendResetPasswordMock = vi.mocked(useSendResetPasswordEmail);

describe('useSendResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })

  it('should initialize form with default values', () => {

    useSearchParamsMock.mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as unknown as ReadonlyURLSearchParams);

    useSendResetPasswordMock.mockReturnValue({
      sendResetPasswordEmail: vi.fn(),
      loading: false,
    });

    const { result } = renderHook(() => useSendResetPasswordForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ email: '' });
  });

  it('should reset form after successful submission', async () => {
    const mockSendResetPassword = vi.fn().mockResolvedValue({ data: "test" });
    useSendResetPasswordMock.mockReturnValue({
      sendResetPasswordEmail: mockSendResetPassword,
      loading: false,
    });
    const { result } = renderHook(() => useSendResetPasswordForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ email: '' });
  });

  it('should return loading state when useSignIn return loading', () => {
    useSendResetPasswordMock.mockReturnValue({
      sendResetPasswordEmail: vi.fn(),
      loading: true,
    });

    const { result } = renderHook(() => useSendResetPasswordForm());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });
});