import { PropsWithChildren } from 'react';
import { AppRoute } from '../../const';
import { RatingCount } from '../../types/guitars';
import { countFullStars, countEmptyStars } from '../../utils';

type RatingProps = PropsWithChildren<{
  rating: RatingCount;
}>;

function Rating(props: RatingProps): JSX.Element {
  const {rating} = props;

  return (
    <>
      {countFullStars(rating).map((item) => (
        <svg key={item} width="14" height="14" aria-hidden="true">
          <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
        </svg>
      ))}
      {countEmptyStars(rating).map((item) => (
        <svg key={item} width="14" height="14" aria-hidden="true">
          <use xlinkHref="/img/sprite_auto.svg#icon-star"></use>
        </svg>
      ))}
      <p className="visually-hidden">Оценка: Хорошо</p>
      {window.location.pathname.includes(AppRoute.Catalog)
        ? <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
        : ''}
    </>
  );
}


export default Rating;
