import {render, screen} from '@testing-library/react';
import MainScreen from './main-screen';

test('Renders app-component', () => {
  render(<MainScreen />);
  const textElement = screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i);
  expect(textElement).toBeInTheDocument();
});
