import {render, screen} from '@testing-library/react';
import ProductReviews from './product-reviews';

test('Renders app-component', () => {
  render(
    <ProductReviews reviews={[]} />);
  const textElement = screen.getByText(/Отзывы/i);
  expect(textElement).toBeInTheDocument();
});
