
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { describe, test, expect, it, beforeEach, afterEach } from '@jest/globals';
import userEvent from '@testing-library/user-event';

// Import jest-dom and extend expect
import '@testing-library/jest-dom';

// Properly setup the Jest DOM matchers type definitions
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // Use extends to avoid conflicts with existing Jest types
    interface Matchers<R> extends Omit<jest.Matchers<R>, 'toBeInTheDocument' | 'toBeVisible' | 'toHaveTextContent' | 'toHaveClass'> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveClass(className: string): R;
    }
    // Add more interfaces as needed for other matcher groups
    interface JestMatchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveClass(className: string): R;
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
export { userEvent };

// override render method
export { customRender as render };

// explicitly export the testing functions that were missing types
export { describe, test, expect, it, beforeEach, afterEach };
