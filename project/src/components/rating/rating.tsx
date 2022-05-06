import { PropsWithChildren } from 'react';
import { AppRoute, ValueofRating } from '../../const';
import { RatingCount, CommentsLength } from '../../types/guitars';
import { countFullStars, countEmptyStars } from '../../utils';

type RatingProps = PropsWithChildren<{
  rating: RatingCount;
  commentsLength: CommentsLength;
}>;

function Rating(props: RatingProps): JSX.Element {
  const { rating, commentsLength } = props;

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
      <p className="visually-hidden">{`Оценка: ${ValueofRating[Math.ceil(rating) as keyof object]}`}</p>
      {window.location.pathname.includes(AppRoute.Catalog)
        ? <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsLength}</p>
        : ''}
    </>
  );
}

Rating.defaultProps = {
  commentsLength: 0,
};

export default Rating;
