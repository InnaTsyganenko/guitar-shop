import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';

test('Renders app-component', () => {
  render(<NotFoundScreen />);
  const textElement = screen.getByText(/404/i);
  expect(textElement).toBeInTheDocument();
});
