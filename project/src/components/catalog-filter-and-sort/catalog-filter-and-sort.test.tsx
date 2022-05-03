import {render, screen} from '@testing-library/react';
import CatalogFilterAndSort from './catalog-filter-and-sort';

test('Renders app-component', () => {
  render(<CatalogFilterAndSort />);
  const textElement = screen.getByText(/Фильтр/i);
  expect(textElement).toBeInTheDocument();
});
