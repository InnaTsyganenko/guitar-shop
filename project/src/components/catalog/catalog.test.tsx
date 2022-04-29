import {render, screen} from '@testing-library/react';
import Catalog from './catalog';

test('Renders app-component', () => {
  render(<Catalog />);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});