/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PropsWithChildren } from 'react';
import { useAppDispatch } from '../../hooks';
import { GuitarForCart } from '../../types/guitars';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import { deleteGuitarFromCart } from '../../store/guitars-operations/guitars-operations';

type ModalCartAddProps = PropsWithChildren<{
  guitar?: GuitarForCart;
  onModalCloseClick: () => void;
}>;

function ModalCartDelete({guitar = {} as GuitarForCart, onModalCloseClick}: ModalCartAddProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDeleteGuitarFromCartButton = (id: number) => {
    dispatch(deleteGuitarFromCart(id));
    onModalCloseClick();
  };

  return (
    <ModalOverlay onModalCloseClick={onModalCloseClick}>
      <div className="modal__content" id="modal-cart-delete" data-testid="modal-cart-delete">
        <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
        <div className="modal__info">
          <img className="modal__img" src={`/${guitar.previewImg}`} width={67} height={137} alt={guitar.name} />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
            <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
            <p className="modal__product-params">Электрогитара, {guitar.stringCount} струнная</p>
            <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span></p>
          </div>
        </div>
        <div className="modal__button-container">
          <button className="button button--small modal__button" onClick={() => handleDeleteGuitarFromCartButton(guitar.id)}>Удалить товар</button>
          <button className="button button--black-border button--small modal__button modal__button--right" onClick={onModalCloseClick}>Продолжить покупки</button>
        </div>
        <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
        </button>
        <ModalCloseButton onModalCloseClick={onModalCloseClick}></ModalCloseButton>
      </div>
    </ModalOverlay>
  );
}

export default ModalCartDelete;
