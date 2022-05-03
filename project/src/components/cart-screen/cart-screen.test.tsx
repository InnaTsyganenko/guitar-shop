import {render, screen} from '@testing-library/react';
import Cart from './cart-screen';

test('Renders app-component', () => {
  render(<Cart />);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});
