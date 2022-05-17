import { PropsWithChildren, useEffect } from 'react';

type ModalReviewThanksProps = PropsWithChildren<{
  onModalThanksCloseClick: () => void;
}>;

function ModalReviewThanks({onModalThanksCloseClick}: ModalReviewThanksProps): JSX.Element {

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
  },[]);

  useEffect(() => {
    const isEscEvent = (evt: KeyboardEvent) => {
      if (evt.key === ('Escape' || 'Esc')){
        onModalThanksCloseClick();
      }
    };
    window.addEventListener('keydown', isEscEvent);
    return () => window.removeEventListener('keydown', isEscEvent);
  },[onModalThanksCloseClick]);

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onModalThanksCloseClick} />
          <div className="modal__content" id="modal">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={onModalThanksCloseClick}
              >К покупкам!
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onModalThanksCloseClick}><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewThanks;
