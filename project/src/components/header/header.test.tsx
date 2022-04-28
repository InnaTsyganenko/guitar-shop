import {render, screen} from '@testing-library/react';
import Header from './header';

test('Renders app-component', () => {
  render(<Header />);
  const textElement = screen.getByText(/О компании/i);
  expect(textElement).toBeInTheDocument();
});
