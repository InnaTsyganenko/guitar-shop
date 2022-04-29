import {render, screen} from '@testing-library/react';
import Cart from './cart';

test('Renders app-component', () => {
  render(<Cart />);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});