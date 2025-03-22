
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

// This is needed because TypeScript doesn't pick up the type extensions from @testing-library/jest-dom
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
