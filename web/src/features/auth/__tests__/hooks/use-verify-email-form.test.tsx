import { renderHook } from "@testing-library/react";
import useSendVerifyEmail from "../../api/use-send-verify-email";
import useVerifyEmailForm from "../../hooks/use-verify-email-form";

vi.mock("../../api/use-send-verify-email", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useVerifyEmailMock = vi.mocked(useSendVerifyEmail);

describe("useVerifyEmailForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize form with default values", () => {
    useVerifyEmailMock.mockReturnValue({
      sendVerifyEmail: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });

    const { result } = renderHook(() => useVerifyEmailForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ email: "" });
  });

  it("should reset form after successful submission", async () => {
    const mockSendVerifyEmail = vi.fn().mockResolvedValue({ data: "test" });
    useVerifyEmailMock.mockReturnValue({
      sendVerifyEmail: mockSendVerifyEmail,
      loading: false,
      setLoading: vi.fn(),
    });
    const { result } = renderHook(() => useVerifyEmailForm());
    const { form } = result.current;

    expect(form.getValues()).toEqual({ email: "" });
  });

  it("should return loading state when useSignIn return loading", () => {
    useVerifyEmailMock.mockReturnValue({
      sendVerifyEmail: vi.fn(),
      loading: true,
      setLoading: vi.fn(),
    });

    const { result } = renderHook(() => useVerifyEmailForm());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });
});
