import {render, screen} from '@testing-library/react';
import Rating from './rating';

test('Renders app-component', () => {
  render(<Rating rating={1} />);
  const textElement = screen.getByText(/Оценка/i);
  expect(textElement).toBeInTheDocument();
});
