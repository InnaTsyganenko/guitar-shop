import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { AppRoute, DEFAULT_PAGE_CATALOG, STEP_ONE } from '../../const';
import { GuitarComments } from '../../types/guitars';

type ProductReviewsProps = PropsWithChildren<{
  reviews: GuitarComments;
}>;

function ProductReviews(props: ProductReviewsProps): JSX.Element {
  const { reviews } = props;

  const dispatch = useAppDispatch();

  const options: object = { day: 'numeric', month: 'long' };

  if (reviews.length === 0) {
    return <div></div>;
  } else {
    return (
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="##" onClick={(evt) => evt.preventDefault()}>Оставить отзыв</a>
        {reviews.map((review) => (
          <div className="review" key={review.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4><span className="review__date">{new Date(review.createAt).toLocaleDateString('ru', options)}</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/img/sprite_auto.svg#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
          </div>
        ))}

        <div className="review">
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
          </div>
          <div className="rate review__rating-panel">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-star"></use>
            </svg>
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">Тугие колонки</p>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
        </div>
        <div className="review">
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
          </div>
          <div className="rate review__rating-panel">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
            </svg>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-star"></use>
            </svg>
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">Тугие колонки</p>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
        </div>
        <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
      </section>
    );
  }
}

export default ProductReviews;
