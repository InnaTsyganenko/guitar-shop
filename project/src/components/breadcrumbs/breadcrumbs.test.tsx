import {render, screen} from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

test('Renders app-component', () => {
  render(<Breadcrumbs guitarName={''} />);
  const textElement = screen.getByText(/Главная/i);
  expect(textElement).toBeInTheDocument();
});
