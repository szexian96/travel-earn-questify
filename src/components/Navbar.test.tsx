
import { render, screen, describe, test, expect, userEvent } from '@/utils/test-utils';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  test('renders home link', () => {
    render(<Navbar />);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders logo', () => {
    render(<Navbar />);
    const logo = screen.getByText(/Tourii/i);
    expect(logo).toBeInTheDocument();
  });

  test('mobile menu opens when menu button is clicked', async () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Click the menu button
    await userEvent.click(menuButton);
    
    // Menu should be visible now
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeVisible();
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
