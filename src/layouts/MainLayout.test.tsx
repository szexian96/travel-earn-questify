
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

// Mock the Navbar component to simplify testing
jest.mock('@/components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

describe('MainLayout Component', () => {
  test('renders navbar', () => {
    render(
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <MainLayout>
              <div>Test Content</div>
            </MainLayout>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
  
  test('renders children', () => {
    render(
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <MainLayout>
              <div>Test Content</div>
            </MainLayout>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toHaveTextContent('Test Content');
  });
  
  test('has the correct layout structure', () => {
    render(
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <MainLayout>
              <div>Test Content</div>
            </MainLayout>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    );
    
    // Check if the main element exists
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    
    // Check if the main element has the right classes
    expect(mainElement).toHaveClass('flex-grow');
  });
});
