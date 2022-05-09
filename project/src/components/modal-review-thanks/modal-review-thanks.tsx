import { PropsWithChildren, useEffect } from 'react';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';

type ModalReviewPostProps = PropsWithChildren<{
  isModalReviewNewOpened: boolean;
  onModalReviewNewCloseClick: () => void;
}>;

function ModalReviewThanks(props: ModalReviewPostProps): JSX.Element {
  const { isModalReviewNewOpened, onModalReviewNewCloseClick } = props;

  const history = browserHistory;
  const currentPage = useAppSelector(getCurrentPageCatalog);

  useEffect(() => {
    const isEscEvent = (evt: any) => {
      if (evt.key === ('Escape' || 'Esc')){
        onModalReviewNewCloseClick();
      }
    }
    window.addEventListener('keydown', isEscEvent)
  return () => window.removeEventListener('keydown', isEscEvent)
},[onModalReviewNewCloseClick])

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => onModalReviewNewCloseClick()} />
          <div className="modal__content">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={() => {
                history.push(`${AppRoute.Catalog}${currentPage}`);
                redirectToRoute(AppRoute.Catalog);}}>К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onModalReviewNewCloseClick()}><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewThanks;
