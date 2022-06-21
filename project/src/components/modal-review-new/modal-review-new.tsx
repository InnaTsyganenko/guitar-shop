import React, { PropsWithChildren } from 'react';
import { RatingValues } from '../../const';
import { useAppDispatch } from '../../hooks';
import { pushCommentAction } from '../../store/api-actions';
import { Guitar } from '../../types/guitars';
import { NewReview } from '../../types/state';
import { useForm } from '../../hooks/use-form';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';

type ModalReviewNewProps = PropsWithChildren<{
  guitar: Guitar;
  onModalCommentCloseClick: () => void;
}>;

function ModalReviewNew({guitar, onModalCommentCloseClick}: ModalReviewNewProps): JSX.Element {

  const dispatch = useAppDispatch();

  const { handleSubmit, handleChange, data: review, errors } = useForm<NewReview>({
    validations: {
      userName: {
        required: {
          value: true,
          message: 'Заполните поле',
        },
      },
      advantage: {
        required: {
          value: true,
          message: 'Заполните поле',
        },
      },
      disadvantage: {
        required: {
          value: true,
          message: 'Заполните поле',
        },
      },
      comment: {
        required: {
          value: true,
          message: 'Заполните поле',
        },
      },
      rating: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 0,
          message: 'Поставьте оценку',
        },
      },
    },
    onSubmit: () => {
      review.guitarId = guitar.id;
      dispatch(pushCommentAction(review));
      onModalCommentCloseClick();
    },
  });

  return (
    <ModalOverlay onModalCloseClick={onModalCommentCloseClick}>
      <div className="modal__content" id="modal-review-new">
        <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
        <form
          className="form-review"
          method="post"
          action="#"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-review__wrapper">
            <div className="form-review__name-wrapper">
              <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
              <input
                className="form-review__input form-review__input--name"
                id="user-name"
                type="text"
                autoComplete="off"
                value={review.userName || ''}
                onChange={handleChange('userName')}
                autoFocus
                required
              />
              <p className="form-review__warning">{errors.userName}&nbsp;</p>
            </div>
            <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
              <div className="rate rate--reverse">
                {Object.entries(RatingValues).reverse().map((item, key) => (
                  <React.Fragment key={item[0]}>
                    <input
                      className="visually-hidden"
                      id={`star-${item[0]}`}
                      name="rate"
                      type="radio"
                      value={item[0]}
                      onChange={handleChange<number>('rating', (value) => parseInt(value, 10))}
                      required
                    />
                    <label className="rate__label" htmlFor={`star-${item[0]}`} title={item[1] as keyof object}></label>
                  </React.Fragment>
                ))}
                <p className="rate__message">{errors.rating}&nbsp;</p>
              </div>
            </div>
          </div>

          <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
          <input
            className="form-review__input"
            id="advantage"
            type="text"
            autoComplete="off"
            onChange={handleChange('advantage')}
            required
          />
          <p className="form-review__warning">{errors.advantage}&nbsp;</p>

          <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
          <input
            className="form-review__input"
            id="disadvantage"
            type="text"
            autoComplete="off"
            onChange={handleChange('disadvantage')}
            required
          />
          <p className="form-review__warning">{errors.disadvantage}&nbsp;</p>

          <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
          <textarea
            className="form-review__input form-review__input--textarea"
            id="comment"
            rows={10}
            autoComplete="off"
            onChange={handleChange('comment')}
            required
          >
          </textarea>
          <p className="form-review__warning">{errors.comment}&nbsp;</p>
          <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
        </form>
        <ModalCloseButton onModalCloseClick={onModalCommentCloseClick} />
      </div>
    </ModalOverlay>
  );
}

export default ModalReviewNew;
