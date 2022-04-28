import {render, screen} from '@testing-library/react';
import Footer from './footer';

test('Renders app-component', () => {
  render(<Footer />);
  const textElement = screen.getByText(/Контакты/i);
  expect(textElement).toBeInTheDocument();
});
