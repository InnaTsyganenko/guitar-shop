import {render, screen} from '@testing-library/react';
import Loading from './loading-screen';

test('Renders app-component', () => {
  render(<Loading />);
  const textElement = screen.getByText(/Loading/i);
  expect(textElement).toBeInTheDocument();
});
