
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthButtons from './AuthButtons';
import { AuthContext } from '@/context/AuthContext';

const mockLogin = jest.fn();
const mockContextValue = {
  login: mockLogin,
  isLoading: false,
  logout: jest.fn(),
  isAuthenticated: false,
  user: null
};

describe('AuthButtons', () => {
  it('renders all auth buttons', () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <AuthButtons />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
    expect(screen.getByText('Continue with Discord')).toBeInTheDocument();
    expect(screen.getByText('Continue with Twitter')).toBeInTheDocument();
    expect(screen.getByText('Continue with Wallet')).toBeInTheDocument();
  });

  it('calls login function with correct provider', () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <AuthButtons />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Continue with Google'));
    expect(mockLogin).toHaveBeenCalledWith('google');

    fireEvent.click(screen.getByText('Continue with Discord'));
    expect(mockLogin).toHaveBeenCalledWith('discord');

    fireEvent.click(screen.getByText('Continue with Twitter'));
    expect(mockLogin).toHaveBeenCalledWith('twitter');

    fireEvent.click(screen.getByText('Continue with Wallet'));
    expect(mockLogin).toHaveBeenCalledWith('wallet');
  });

  it('displays loading state when isLoading is true', () => {
    render(
      <AuthContext.Provider value={{ ...mockContextValue, isLoading: true }}>
        <AuthButtons />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Please wait')).toBeInTheDocument();
    expect(screen.queryByText('Continue with Google')).not.toBeInTheDocument();
  });
});
