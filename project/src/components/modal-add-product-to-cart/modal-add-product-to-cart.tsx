import React, { PropsWithChildren, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { Guitar } from '../../types/guitars';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';
import useKeypress from '../../hooks/use-keypress';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';

type ModalAddProductToCartProps = PropsWithChildren<{
  guitar?: Guitar;
  onModalCloseClick: () => void;
}>;

function ModalAddProductToCart({guitar = {} as Guitar, onModalCloseClick}: ModalAddProductToCartProps): JSX.Element {

  const dispatch = useAppDispatch();

  console.log(guitar)

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <ModalOverlay onModalCloseClick={onModalCloseClick} />
        <div className="modal__content" id="modal">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info"><img className="modal__img" src={`/${guitar.previewImg}`} width={67} height={137} alt={guitar.name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">Электрогитара, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
          </div>
          <ModalCloseButton onModalCloseClick={onModalCloseClick} />
        </div>
      </div>
    </div>
  );
}

export default ModalAddProductToCart;
