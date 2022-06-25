/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Guitar } from '../../types/guitars';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import { setGuitarInCart, setGuitarInCartState } from '../../store/guitars-operations/guitars-operations';
import { getGuitarsInCart } from '../../store/guitars-operations/selectors';

type ModalCartAddProps = PropsWithChildren<{
  guitar?: Guitar;
  onModalCloseClick: () => void;
}>;

function ModalCartAdd({guitar = {} as Guitar, onModalCloseClick}: ModalCartAddProps): JSX.Element {

  const dispatch = useAppDispatch();

  const guitarsInCart = useAppSelector(getGuitarsInCart);

  const adaptGuitarForCart = (params: any) => {
    const adapted = {...params};

    delete adapted.description;
    delete adapted.rating;
    delete adapted.comments;

    if (guitarsInCart.some((item) => item.id === guitar.id)) {
      return {...adapted, guitarQt: (guitarsInCart.find((item) => item.id === guitar.id)!.guitarQt) + 1};
    } else {
      return {...adapted, guitarQt: 1};
    }
  };

  const handleAddGuitarInCartButton = () => {
    dispatch(setGuitarInCart(adaptGuitarForCart(guitar)));
    dispatch(setGuitarInCartState(true));
    onModalCloseClick();
  };

  return (
    <ModalOverlay onModalCloseClick={onModalCloseClick}>
      <div className="modal__content" id="modal-cart-add">
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
          <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddGuitarInCartButton}>Добавить в корзину</button>
        </div>
        <ModalCloseButton onModalCloseClick={onModalCloseClick} />
      </div>
    </ModalOverlay>
  );
}

export default ModalCartAdd;
