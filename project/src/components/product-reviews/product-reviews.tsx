import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { COMMENTS_QUANTITY_FOR_DISPLAY } from '../../const';
import { throttle } from '../../utils/utils';
import { Guitar, GuitarComments } from '../../types/guitars';
import Rating from '../rating/rating';
import ModalReviewNew from '../modal-review-new/modal-review-new';
import ModalReviewThanks from '../modal-review-thanks/modal-review-thanks';
import { getIsReviewNewPushed } from '../../store/guitars-data/selectors';
import { setIsNewCommentPush } from '../../store/guitars-data/guitars-data';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';

type ProductReviewsProps = PropsWithChildren<{
  currentGuitar: Guitar;
  reviews: GuitarComments;
}>;

function ProductReviews(props: ProductReviewsProps): JSX.Element {
  const { currentGuitar, reviews } = props;
  const [quantityComment, setQuantityCommentForDisplay] = useState(COMMENTS_QUANTITY_FOR_DISPLAY);
  const [isModalReviewNewOpened, setModalReviewNewOpened] = useState(false);

  const dispatch = useAppDispatch();

  const isNewCommentPushed = useAppSelector(getIsReviewNewPushed);

  const handleReviewNewBtnClick = () => {
    setModalReviewNewOpened(!isModalReviewNewOpened);
    dispatch(setModalWindowState(false));
  };

  const handleModalThanksCloseClick = () => {
    dispatch(setIsNewCommentPush(false));
    dispatch(setModalWindowState(true));
  };

  const sortReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  const optionsForReviewDate: object = { day: 'numeric', month: 'long' };

  useEffect(() => {
    const checkPosition = () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 3;
      const position = scrolled + screenHeight;

      if ((position >= threshold) && (quantityComment <= reviews.length)) {
        setQuantityCommentForDisplay(quantityComment + COMMENTS_QUANTITY_FOR_DISPLAY);
      }
    };

    const throttledCheckPosition = throttle(checkPosition, 250);

    window.addEventListener('scroll', throttledCheckPosition);
    window.addEventListener('resize', throttledCheckPosition);

    if (isNewCommentPushed && (quantityComment >= reviews.length)) {
      setQuantityCommentForDisplay(COMMENTS_QUANTITY_FOR_DISPLAY);
    }

    return () => {
      window.removeEventListener('scroll', throttledCheckPosition);
      window.removeEventListener('resize', throttledCheckPosition);
    };
  }, [quantityComment, reviews.length, isNewCommentPushed]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button" href="##"
        onClick={(evt) => {
          evt.preventDefault();
          handleReviewNewBtnClick();
        }}
      >Оставить отзыв
      </a>
      {sortReviews.slice(0, quantityComment).map((review) => (
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

      {reviews.length <= quantityComment
        ? ''
        :
        <button
          className="button button--medium reviews__more-button"
          onClick={() => setQuantityCommentForDisplay(quantityComment + COMMENTS_QUANTITY_FOR_DISPLAY)}
        >Показать еще отзывы
        </button>}
      {reviews.length === 0
        ? ''
        :
        <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>}

      {isModalReviewNewOpened &&
        <ModalReviewNew
          guitar={currentGuitar}
          onModalReviewNewCloseClick={handleReviewNewBtnClick}
        />}

      {isNewCommentPushed &&
        <ModalReviewThanks
          onModalThanksCloseClick={handleModalThanksCloseClick}
        />}

    </section>
  );
}

export default ProductReviews;
