
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

describe('Navbar Component', () => {
  const renderWithProviders = () => {
    return render(
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    );
  };

  test('renders home link', () => {
    renderWithProviders();
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders logo', () => {
    renderWithProviders();
    const logo = screen.getByText(/tourii/i);
    expect(logo).toBeInTheDocument();
  });

  test('mobile menu opens when menu button is clicked', async () => {
    renderWithProviders();
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Click the menu button
    await userEvent.click(menuButton);
    
    // Navigation should now be visible
    const mobileNav = screen.getByRole('navigation');
    expect(mobileNav).toBeVisible();
  });

  test('navigates to different pages', () => {
    renderWithProviders();
    
    // Check if main navigation links exist
    expect(screen.getByText(/quests/i)).toBeInTheDocument();
    expect(screen.getByText(/stories/i)).toBeInTheDocument();
    expect(screen.getByText(/routes/i)).toBeInTheDocument();
    expect(screen.getByText(/explore/i)).toBeInTheDocument();
  });
});
