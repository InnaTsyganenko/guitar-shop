import {render, screen} from '@testing-library/react';
import ModalReviewThanks from './modal-review-thanks';

test('Renders app-component', () => {
  render(<ModalReviewThanks onModalReviewThanksCloseClick={jest.fn()} />);
  const textElement = screen.getByText(/Спасибо за ваш отзыв/i);
  expect(textElement).toBeInTheDocument();
});
