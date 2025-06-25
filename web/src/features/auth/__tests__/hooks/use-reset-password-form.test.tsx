import { renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import useResetPassword from "../../api/use-reset-password";
import useResetPasswordForm from "../../hooks/use-reset-password-form";

vi.mock("next/navigation", () => {
  return {
    useSearchParams: vi.fn(),
    useRouter: () => ({ push: vi.fn() }),
  };
});

vi.mock("../../api/use-reset-password", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useSearchParamsMock = vi.mocked(useSearchParams);
const useResetPasswordMock = vi.mocked(useResetPassword);

describe("useResetPasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize form with default values", () => {
    useSearchParamsMock.mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as unknown as ReadonlyURLSearchParams);

    useResetPasswordMock.mockReturnValue({
      resetPassword: vi.fn(),
      loading: false,
    });

    const { result } = renderHook(() => useResetPasswordForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ password: "" });
  });

  it("should reset form after successful submission", async () => {
    const mockResetPassword = vi.fn().mockResolvedValue({ error: null });
    useResetPasswordMock.mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
    });
    const { result } = renderHook(() => useResetPasswordForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ password: "" });
  });

  it("should return loading state when useSignIn return loading", () => {
    useResetPasswordMock.mockReturnValue({
      resetPassword: vi.fn(),
      loading: true,
    });

    const { result } = renderHook(() => useResetPasswordForm());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });
});
