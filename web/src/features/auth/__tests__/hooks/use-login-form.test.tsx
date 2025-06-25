import { renderHook } from "@testing-library/react";
import useLoginForm from "../../hooks/use-login-form";
import useSignIn from "../../api/use-signin";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "../../context";
import type { ReadonlyURLSearchParams } from "next/navigation";

const mockContextValues = {
  setEmailNotVerifyAlert: vi.fn(),
  setEmailVerifyAlert: vi.fn(),
  showEmailNotVerifyAlert: false,
  showEmailVerifyAlert: false,
  isOpenSendResetPasswordDialog: false,
  setIsOpenSendResetPasswordDialog: vi.fn(),
};

vi.mock("next/navigation", () => {
  return {
    useSearchParams: vi.fn(),
    useRouter: () => ({ push: vi.fn() }),
  };
});

vi.mock("../../api/use-signin", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../context", () => ({
  useAuthContext: vi.fn(() => mockContextValues),
}));

const useAuthContextMock = vi.mocked(useAuthContext);
const useSearchParamsMock = vi.mocked(useSearchParams);
const useSignInMock = vi.mocked(useSignIn);

describe("useLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize form with default values", () => {
    useSearchParamsMock.mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as unknown as ReadonlyURLSearchParams);

    useSignInMock.mockReturnValue({
      signIn: vi.fn(),
      loading: false,
      error: null,
    });

    useAuthContextMock.mockReturnValue(mockContextValues);

    const { result } = renderHook(() => useLoginForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ email: "", password: "" });
  });

  it('should call setEmailNotVerifyAlert when error is "Email not verified"', () => {
    useSearchParamsMock.mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as unknown as ReadonlyURLSearchParams);

    useSignInMock.mockReturnValue({
      signIn: vi.fn(),
      loading: false,
      error: "Email not verified",
    });

    const setEmailNotVerifyAlertMock = vi.fn();
    useAuthContextMock.mockReturnValue({
      ...mockContextValues,
      setEmailNotVerifyAlert: setEmailNotVerifyAlertMock,
    });
    renderHook(() => useLoginForm());
    expect(setEmailNotVerifyAlertMock).toHaveBeenCalledWith(true);
  });

  it("should call setEmailVerifyAlert when searchParams get verified", () => {
    useSearchParamsMock.mockReturnValue({
      get: vi.fn().mockReturnValue("verified"),
    } as unknown as ReadonlyURLSearchParams);

    useSignInMock.mockReturnValue({
      signIn: vi.fn(),
      loading: false,
      error: "",
    });

    const setEmailVerifyAlertMock = vi.fn();
    useAuthContextMock.mockReturnValue({
      ...mockContextValues,
      setEmailVerifyAlert: setEmailVerifyAlertMock,
    });
    renderHook(() => useLoginForm());
    expect(setEmailVerifyAlertMock).toHaveBeenCalledWith(true);
  });

  it("should return loading state when useSignIn return loading", () => {
    useSignInMock.mockReturnValue({
      signIn: vi.fn(),
      loading: true,
      error: "",
    });

    const { result } = renderHook(() => useLoginForm());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });

  it("should reset form on successful sign in", async () => {
    const mockSignIn = vi
      .fn()
      .mockResolvedValue({ data: { token: "mockToken" } });
    useSignInMock.mockReturnValue({
      signIn: mockSignIn,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useLoginForm());
    const { form } = result.current;
    expect(form.getValues()).toEqual({ email: "", password: "" });
  });
});
