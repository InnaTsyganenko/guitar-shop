import {render, screen} from '@testing-library/react';
import CatalogPagination from './catalog-pagination';

test('Renders app-component', () => {
  render(
    <CatalogPagination
      page={1}
      totalPages={3}
      handlePagination={jest.fn()}
    />);
  const textElement = screen.getByText(/Далее/i);
  expect(textElement).toBeInTheDocument();
});
