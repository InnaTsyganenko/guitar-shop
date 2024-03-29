import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { COMMENTS_QUANTITY_FOR_DISPLAY, optionsForReviewDate } from '../../const';
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

function ProductReviews({currentGuitar, reviews}: ProductReviewsProps): JSX.Element {
  const [quantityComment, setQuantityCommentForDisplay] = useState(COMMENTS_QUANTITY_FOR_DISPLAY);
  const [isModalCommentOpen, setModalCommentOpened] = useState(false);

  const dispatch = useAppDispatch();

  const newReviewButton = document.querySelector('.reviews__sumbit-button');

  const handleReviewNewBtnClick = () => {
    setModalCommentOpened(!isModalCommentOpen);
    dispatch(setModalWindowState(true));
  };

  const handleModalClose = () => {
    dispatch(setIsNewCommentPush(false));
    dispatch(setModalWindowState(false));
    (newReviewButton as HTMLElement)?.focus();
  };

  const isCommentPushed = useAppSelector(getIsReviewNewPushed);

  const sortReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

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

    if (isCommentPushed && (quantityComment >= reviews.length)) {
      setQuantityCommentForDisplay(COMMENTS_QUANTITY_FOR_DISPLAY);
    }

    return () => {
      window.removeEventListener('scroll', throttledCheckPosition);
      window.removeEventListener('resize', throttledCheckPosition);
    };
  }, [quantityComment, reviews.length, isCommentPushed]);

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

      {isModalCommentOpen &&
        <ModalReviewNew
          guitar={currentGuitar}
          onModalCommentCloseClick={handleReviewNewBtnClick}
        />}

      {isCommentPushed &&
        <ModalReviewThanks
          onModalThanksCloseClick={handleModalClose}
        />}

    </section>
  );
}

export default ProductReviews;
