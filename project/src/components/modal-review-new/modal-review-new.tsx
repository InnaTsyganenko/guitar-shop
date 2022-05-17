import React, { PropsWithChildren, useEffect, useCallback } from 'react';
import { RatingValues } from '../../const';
import { useAppDispatch } from '../../hooks';
import { pushCommentAction } from '../../store/api-actions';
import { Guitar } from '../../types/guitars';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';
import { NewReview } from '../../types/use-form-interface';
import { useForm } from '../../hooks/use-form';

type ModalReviewNewProps = PropsWithChildren<{
  guitar: Guitar;
  onModalReviewNewCloseClick: () => void;
}>;

function ModalReviewNew({guitar, onModalReviewNewCloseClick}: ModalReviewNewProps): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const modal = document.getElementById('modal');

    const focusableElementsString = ('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');

    const focusableElements = Array.prototype.slice.call(modal?.querySelectorAll(focusableElementsString));
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];
    firstTabStop.focus();

    function trapTabKey(evt: KeyboardEvent) {
      if (evt.key === 'Tab') {
        if (evt.shiftKey) {
          if (document.activeElement === firstTabStop) {
            evt.preventDefault();
            lastTabStop.focus();
          }

        } else {
          if (document.activeElement === lastTabStop) {
            evt.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    }

    modal?.addEventListener('keydown', trapTabKey);
    return () => modal?.removeEventListener('keydown', trapTabKey);
  },[dispatch]);

  const handleModalClose = useCallback(() => {
    onModalReviewNewCloseClick();
    dispatch(setModalWindowState(false));
  }, [onModalReviewNewCloseClick, dispatch]);

  useEffect(() => {
    const isEscEvent = (evt: KeyboardEvent) => {
      if (evt.key === ('Escape' || 'Esc')){
        handleModalClose();
      }
    };
    window.addEventListener('keydown', isEscEvent);
    return () => window.removeEventListener('keydown', isEscEvent);
  },[dispatch, handleModalClose]);


  const { handleSubmit, handleChange, data: review, errors } = useForm<NewReview>({
    validations: {
      userName: {
        custom: {
          isValid: (value) => value !== undefined,
          message: 'Заполните поле',
        },
      },
      advantage: {
        custom: {
          isValid: (value) => value !== undefined,
          message: 'Заполните поле',
        },
      },
      disadvantage: {
        custom: {
          isValid: (value) => value !== undefined,
          message: 'Заполните поле',
        },
      },
      comment: {
        custom: {
          isValid: (value) => value !== undefined,
          message: 'Заполните поле',
        },
      },
      rating: {
        custom: {
          isValid: (value) => parseInt(value, 5) > 0,
          message: 'Поставьте оценку',
        },
      },
    },
    onSubmit: () => {
      review.guitarId = guitar.id;
      dispatch(pushCommentAction(review));
      handleModalClose();
    },
  });

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal
            onClick={handleModalClose}
          >
          </div>
          <div className="modal__content" id="modal">
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
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              onClick={handleModalClose}
            ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewNew;
