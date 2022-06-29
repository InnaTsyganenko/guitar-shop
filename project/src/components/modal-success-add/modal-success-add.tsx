import { PropsWithChildren } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type ModalSuccessAddProps = PropsWithChildren<{
  onModalSuccessAddCloseClick: () => void;
}>;

function ModalSuccessAdd({onModalSuccessAddCloseClick}: ModalSuccessAddProps): JSX.Element {

  return (
    <ModalOverlay onModalCloseClick={onModalSuccessAddCloseClick}>
      <div className="modal__content" id="modal-success-add">
        <svg className="modal__icon" width={26} height={20} aria-hidden="true">
          <use xlinkHref="/img/sprite_auto.svg#icon-success" />
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <Link className="button button--small modal__button" to={AppRoute.Cart} onClick={onModalSuccessAddCloseClick}>Перейти в корзину</Link>
          <Link
            className="button button--black-border button--small modal__button modal__button--right"
            to={window.location.pathname === AppRoute.Catalog ? '##' : AppRoute.Catalog} onClick={onModalSuccessAddCloseClick}
          >Продолжить покупки
          </Link>
        </div>
        <ModalCloseButton onModalCloseClick={onModalSuccessAddCloseClick} />
      </div>
    </ModalOverlay>
  );
}

export default ModalSuccessAdd;
