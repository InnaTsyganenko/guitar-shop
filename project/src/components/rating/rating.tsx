import { PropsWithChildren } from 'react';
import { ValueofRating } from '../../const';
import { RatingCount, CommentsLength } from '../../types/guitars';
import { countFullStars, countEmptyStars } from '../../utils/utils';

type RatingProps = PropsWithChildren<{
  rating: RatingCount;
  commentsLength: CommentsLength;
  isRatingWithCountReviews: boolean,
}>;

function Rating(props: RatingProps): JSX.Element {
  const { rating, commentsLength, isRatingWithCountReviews } = props;

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
      {isRatingWithCountReviews
        ? <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsLength}</p>
        : ''}
    </>
  );
}

Rating.defaultProps = {
  commentsLength: 0,
  isRatingWithCountReviews: false,
};

export default Rating;
