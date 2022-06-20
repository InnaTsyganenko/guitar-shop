import { PropsWithChildren } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';

type ModalReviewThanksProps = PropsWithChildren<{
  onModalThanksCloseClick: () => void;
}>;

function ModalReviewThanks({onModalThanksCloseClick}: ModalReviewThanksProps): JSX.Element {

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <ModalOverlay onModalCloseClick={onModalThanksCloseClick} />
          <div className="modal__content" id="modal">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="/img/sprite_auto.svg#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={onModalThanksCloseClick}
              >К покупкам!
              </button>
            </div>
            <ModalCloseButton onModalCloseClick={onModalThanksCloseClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewThanks;
