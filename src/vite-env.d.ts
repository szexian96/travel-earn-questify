
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

// Add explicit types for jest-dom matchers
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toBeVisible(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveClass(className: string): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
