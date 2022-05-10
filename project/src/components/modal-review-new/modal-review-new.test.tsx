import {render, screen} from '@testing-library/react';
import ModalReviewNew from './modal-review-new';

test('Renders app-component', () => {
  render(<ModalReviewNew onModalReviewNewCloseClick={jest.fn()} />);
  const textElement = screen.getByText(/Оставить отзыв/i);
  expect(textElement).toBeInTheDocument();
});
