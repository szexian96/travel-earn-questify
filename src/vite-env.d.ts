
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

// This extends the Jest matchers with custom DOM matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveClass(className: string): R;
    }
  }
}

export {};
