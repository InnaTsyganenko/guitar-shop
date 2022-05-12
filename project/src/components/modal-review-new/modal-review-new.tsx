import React, { ChangeEvent } from 'react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { ValueofRating } from '../../const';
import { useAppDispatch } from '../../hooks';
import { pushReviewAction } from '../../store/api-actions';
import { Guitar } from '../../types/guitars';

type ModalReviewNewProps = PropsWithChildren<{
  guitar: Guitar;
  onModalReviewNewCloseClick: () => void;
}>;

function ModalReviewNew(props: ModalReviewNewProps): JSX.Element {
  const { guitar, onModalReviewNewCloseClick } = props;

  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    guitarId: guitar.id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  const handleInputRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      rating: parseInt(evt.target.value, 10),
    });
  };

  useEffect(() => {
    const isEscEvent = (evt: KeyboardEvent) => {
      if (evt.key === ('Escape' || 'Esc')){
        onModalReviewNewCloseClick();
      }
    };
    window.addEventListener('keydown', isEscEvent);
    return () => window.removeEventListener('keydown', isEscEvent);
  },[onModalReviewNewCloseClick]);

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => onModalReviewNewCloseClick()}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
            <form
              className="form-review"
              method="post"
              action="#"
              onSubmit={(evt) => {
                evt.preventDefault();
                dispatch(pushReviewAction(state));
                onModalReviewNewCloseClick();
              }}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input
                    className="form-review__input form-review__input--name"
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    onChange={(event) => state.userName = event.target.value}
                    autoFocus
                    required
                  />
                  <p className="form-review__warning">Заполните поле</p>
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    {Object.entries(ValueofRating).reverse().map((value, key) => (
                      <React.Fragment key={value[0]}>
                        <input
                          className="visually-hidden"
                          id={`star-${value[0]}`}
                          name="rate"
                          type="radio"
                          value={value[0]}
                          onChange={(evt) => handleInputRatingChange(evt)}
                        />
                        <label className="rate__label" htmlFor={`star-${value[0]}`} title={value[1] as keyof object}></label>
                      </React.Fragment>
                    ))}
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>

              <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
              <input
                className="form-review__input"
                id="advantage"
                type="text"
                autoComplete="off"
                onChange={(event) => state.advantage = event.target.value}
                required
              />
              <p className="form-review__warning">Заполните поле</p>

              <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
              <input
                className="form-review__input"
                id="disadvantage"
                type="text"
                autoComplete="off"
                onChange={(event) => state.disadvantage = event.target.value}
                required
              />
              <p className="form-review__warning">Заполните поле</p>

              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="comment"
                rows={10}
                autoComplete="off"
                onChange={(event) => state.comment = event.target.value}
                required
              >
              </textarea>
              <p className="form-review__warning">Заполните поле</p>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onModalReviewNewCloseClick()}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewNew;
