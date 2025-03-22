
import { render, screen } from '@/utils/test-utils';
import MainLayout from './MainLayout';

describe('MainLayout Component', () => {
  test('renders navbar', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    // Check if the Questify logo in navbar is present
    const logo = screen.getByText(/questify/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders children', () => {
    render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );
    
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  test('has correct structure', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    // Check if main element exists
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    
    // Check if the layout has the expected class structure
    expect(mainElement).toHaveClass('flex-grow');
  });
});
