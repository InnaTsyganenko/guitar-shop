import { PropsWithChildren } from 'react';
import { RatingValues, TOTAL_RATING_UNITS } from '../../const';
import { RatingCount, CommentsLength } from '../../types/guitars';

type RatingProps = PropsWithChildren<{
  rating: RatingCount;
  commentsLength?: CommentsLength;
  isRatingWithCountReviews?: boolean,
}>;

function Rating({rating, commentsLength = 0, isRatingWithCountReviews = false}: RatingProps): JSX.Element {
  rating = Math.round(rating);
  return (
    <>
      {Array.from(Array(rating).keys()).map((item) => (
        <svg key={item} width="14" height="14" aria-hidden="true">
          <use xlinkHref="/img/sprite_auto.svg#icon-full-star"></use>
        </svg>
      ))}
      {Array.from(Array(TOTAL_RATING_UNITS - rating).keys()).map((item) => (
        <svg key={item} width="14" height="14" aria-hidden="true">
          <use xlinkHref="/img/sprite_auto.svg#icon-star"></use>
        </svg>
      ))}
      <p className="visually-hidden">{`Оценка: ${RatingValues[Math.ceil(rating) as keyof object]}`}</p>
      {isRatingWithCountReviews
        ? <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsLength}</p>
        : ''}
    </>
  );
}

export default Rating;
