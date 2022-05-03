import {render, screen} from '@testing-library/react';
import Product from './product-screen';

test('Renders app-component', () => {
  render(<Product />);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});
