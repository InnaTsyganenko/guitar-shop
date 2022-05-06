import { PropsWithChildren, useEffect, useState } from 'react';
import { SHOW_COMMENTS_QUANTITY } from '../../const';
import { throttle } from '../../utils';
import { GuitarComments } from '../../types/guitars';
import Rating from '../rating/rating';

type ProductReviewsProps = PropsWithChildren<{
  reviews: GuitarComments;
}>;

function ProductReviews(props: ProductReviewsProps): JSX.Element {
  const { reviews } = props;
  const [countComment, setCountCommentForDisplay] = useState(SHOW_COMMENTS_QUANTITY);

  const sortReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  const optionsForReviewDate: object = { day: 'numeric', month: 'long' };

  useEffect(() => {
    const checkPosition = () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 4;
      const position = scrolled + screenHeight;

      if ((position >= threshold) && (countComment <= reviews.length)) {
        setCountCommentForDisplay(countComment + SHOW_COMMENTS_QUANTITY);
      }
    };

    const throttledCheckPosition = throttle(checkPosition, 150);

    window.addEventListener('scroll', throttledCheckPosition);

    return () => window.removeEventListener('scroll', throttledCheckPosition);
  }, [countComment, reviews.length]);

  if (reviews.length === 0) {
    return <div></div>;
  } else {
    return (
      <section className="reviews" >
        <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="##" onClick={(evt) => evt.preventDefault()}>Оставить отзыв</a>
        {sortReviews.slice(0, countComment).map((review) => (
          <div className="review" key={review.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4><span className="review__date">{new Date(review.createAt).toLocaleDateString('ru', optionsForReviewDate)}</span>
            </div>
            <div className="rate review__rating-panel">
              <Rating rating={review.rating} />
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">{review.advantage}</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">{review.disadvantage}</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">{review.comment}</p>
          </div>
        ))}

        {reviews.length <= countComment
          ? ''
          :
          <button
            className="button button--medium reviews__more-button"
            onClick={() => setCountCommentForDisplay(countComment + SHOW_COMMENTS_QUANTITY)}
          >Показать еще отзывы
          </button>}
        <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
      </section>
    );
  }
}

export default ProductReviews;
