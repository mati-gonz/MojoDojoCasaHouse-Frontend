import { render, screen, fireEvent, act } from '@testing-library/react';
import HelpMenu from '../../components/helpMenu';

describe('<HelpMenu />', () => {
  test('should render help menu', () => {
    render(<HelpMenu />);
    const welcomeElement = screen.getByText('¡Bienvenido al menú de ayuda!');
    expect(welcomeElement).toBeInTheDocument();
  });

  test('help menu appears on click', () => {
    render(<HelpMenu />);
    const helpButton = screen.getByText('?');
    act(() => {
      fireEvent.click(helpButton);
    });
  
    const menu = screen.getByText('¡Bienvenido al menú de ayuda!');
    expect(menu).toBeInTheDocument();  
  })
});