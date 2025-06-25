/// <reference types="@vitest/browser/context" />

import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
