
/// <reference types="vite/client" />

// Extend Jest matchers for DOM testing
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toHaveTextContent(text: string): R;
    toHaveClass(className: string): R;
    // Add other custom matchers used in tests
  }
}

// Extend global Jest types for testing
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toHaveClass(className: string): R;
      // Add other custom matchers used in tests
    }
  }
}
