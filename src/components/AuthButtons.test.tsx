import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthButtons from './AuthButtons';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

describe('AuthButtons Component', () => {
  const renderWithProviders = () => {
    return render(
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AuthButtons />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    );
  };

  test('renders sign in button when not authenticated', () => {
    renderWithProviders();
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  test('renders auth provider buttons when clicked', async () => {
    renderWithProviders();
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    
    // Click the sign in button
    await userEvent.click(signInButton);
    
    // Check if auth provider buttons are rendered
    const discordButton = screen.getByRole('button', { name: /discord/i });
    const twitterButton = screen.getByRole('button', { name: /twitter/i });
    const googleButton = screen.getByRole('button', { name: /google/i });
    
    expect(discordButton).toBeInTheDocument();
    expect(twitterButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  test('closes auth dialog when cancel is clicked', async () => {
    renderWithProviders();
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    
    // Open the dialog
    await userEvent.click(signInButton);
    
    // Find and click the cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);
    
    // Check if the dialog is closed (auth provider buttons should not be visible)
    const discordButton = screen.queryByRole('button', { name: /discord/i });
    expect(discordButton).not.toBeInTheDocument();
  });
});
