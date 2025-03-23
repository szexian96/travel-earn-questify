
/// <reference types="vite/client" />

// Extend Jest matchers for DOM testing
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toHaveClass(className: string): R;
    }
  }
}

// Ensure the module can be imported
export {};
