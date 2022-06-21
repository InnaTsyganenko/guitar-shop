import { PropsWithChildren } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';

type ModalReviewThanksProps = PropsWithChildren<{
  onModalThanksCloseClick: () => void;
}>;

function ModalReviewThanks({onModalThanksCloseClick}: ModalReviewThanksProps): JSX.Element {

  return (
    <ModalOverlay onModalCloseClick={onModalThanksCloseClick}>
      <div className="modal__content" id="modal-success-review">
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
    </ModalOverlay>
  );
}

export default ModalReviewThanks;
