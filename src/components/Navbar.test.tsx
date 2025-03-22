
import { render, screen } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  test('renders home link', () => {
    render(<Navbar />);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders logo', () => {
    render(<Navbar />);
    const logo = screen.getByText(/questify/i);
    expect(logo).toBeInTheDocument();
  });

  test('mobile menu opens when menu button is clicked', async () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Menu should be closed initially
    expect(screen.queryByRole('navigation')).not.toBeVisible();
    
    // Click the menu button
    await userEvent.click(menuButton);
    
    // Menu should be visible now
    expect(screen.getByRole('navigation')).toBeVisible();
  });

  test('navigates to different pages', () => {
    render(<Navbar />);
    
    // Check if main navigation links exist
    expect(screen.getByText(/quests/i)).toBeInTheDocument();
    expect(screen.getByText(/stories/i)).toBeInTheDocument();
    expect(screen.getByText(/routes/i)).toBeInTheDocument();
    expect(screen.getByText(/explore/i)).toBeInTheDocument();
  });
});
