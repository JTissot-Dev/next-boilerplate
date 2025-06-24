import { renderHook } from '@testing-library/react';
import useSignUp from '../../api/use-signup';
import useSignupForm from '../../hooks/use-signup-form';


vi.mock('../../api/use-signup', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useSignUpMock = vi.mocked(useSignUp);

describe('useSignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })

  it('should initialize form with default values', () => {
    useSignUpMock.mockReturnValue({
      signUp: vi.fn(),
      loading: false,
    });

    const { result } = renderHook(() => useSignupForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ name: '', email: '', password: '' });
  });

  it('should reset form after successful submission', async () => {
    const mockSendResetPassword = vi.fn().mockResolvedValue({ data: "test" });
    useSignUpMock.mockReturnValue({
      signUp: mockSendResetPassword,
      loading: false,
    });
    const { result } = renderHook(() => useSignupForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ name: '', email: '', password: '' });
  });

  it('should return loading state when useSignIn return loading', () => {
    useSignUpMock.mockReturnValue({
      signUp: vi.fn(),
      loading: true,
    });

    const { result } = renderHook(() => useSignupForm());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });
});