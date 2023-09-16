/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Wrapper from '../wrapper/wrapper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarsInCart } from '../../store/guitars-operations/selectors';
import { AppRoute, Discounts, GuitarType } from '../../const';
import { decreaseGuitarCartQt, increaseGuitarCartQt, setGuitarInCart } from '../../store/guitars-operations/guitars-operations';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/use-form';
import { pushCouponAction } from '../../store/api-actions';
import { CouponPost } from '../../types/state';
import { getDiscountFromCoupon } from '../../store/guitars-data/selectors';
import { setDiscountFromCoupon } from '../../store/guitars-data/guitars-data';
import { Link } from 'react-router-dom';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';

function CartScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const totalCountRef = useRef<HTMLElement>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [guitarIdForDelete, setGuitarIdForDelete] = useState(0);

  const guitarsInCart = useAppSelector(getGuitarsInCart);

  const handleCartDeleteButton = (id: number) => {
    setIsDeleteModalOpen(true);
    setGuitarIdForDelete(id);
  };

  const handleCartQuantityIncrease = (id: number) => {
    if (guitarsInCart.find((item) => item.id === id)?.guitarQt === 99) {
      return;
    }

    dispatch(increaseGuitarCartQt(id));
  };

  const handleCartQuantityDecrease = (id: number) => {
    if (guitarsInCart.find((item) => item.id === id)?.guitarQt === 1) {
      setIsDeleteModalOpen(true);
      setGuitarIdForDelete(id);
    } else {
      dispatch(decreaseGuitarCartQt(id));
    }
  };

  const handleQuantityInput = (evt: any, id: number) => {
    if (Number(evt.target.value) > 99) {
      evt.target.value = 99;
    }

    if (evt.target.value === '') {
      evt.target.value = 1;
      evt.target.select();
    }

    const findGuitar = guitarsInCart.find((item) => item.id === id);
    const mutateGuitar = {...findGuitar, guitarQt: Number(evt.target.value)};
    dispatch(setGuitarInCart(mutateGuitar));

    if (Number(evt.target.value) === 0) {
      setIsDeleteModalOpen(true);
      setGuitarIdForDelete(id);
    }
  };

  const fetchCoupon = useCallback(async (couponPost) => {
    await dispatch(pushCouponAction(couponPost));
  }, [dispatch]);

  const { handleSubmit, handleChange, handlePaste, data: couponPost, errors } = useForm<CouponPost>({
    validations: {
      coupon: {
        custom: {
          isValid: (value) => Discounts.some((item) => item.discount === (value.toLowerCase())),
          message: 'неверный промокод',
        },
      },
    },
    onSubmit: () => {
      fetchCoupon(couponPost);
    },
  });

  const discount = useAppSelector(getDiscountFromCoupon);

  const handleInputCouponKeyDown = (evt: any) => {
    dispatch(setDiscountFromCoupon(0));
    if (evt.key === ' ') {
      evt.preventDefault();
    }
  };

  const handleInputPriceFocus = (evt: any) => evt.target.select();

  useEffect(() => {
    setTotalCount(Number(totalCountRef.current?.innerText.match(/\d+/g)?.join('')));
  }, [guitarsInCart]);

  if (guitarsInCart?.length === 0) {
    dispatch(setDiscountFromCoupon(0));
  }

  const handleDeleteModalCloseClick = () => {
    setIsDeleteModalOpen(false);
  };
  const a = true;
  console.log(discount)

  return (
    <Wrapper>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs guitarId={0} guitarName={''} />
          <div className="cart" data-testid="cart">
            {guitarsInCart?.map((guitar) => (
              <div key={guitar.id} className="cart-item">
                <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => handleCartDeleteButton(guitar.id)}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
                </button>
                <div className="cart-item__image"><img src={`/${guitar.previewImg}`} width="55" height="130" alt="ЭлектроГитара Честер bass" />
                </div>
                <div className="product-info cart-item__info">
                  <p className="product-info__title">{GuitarType[guitar.type as keyof object]} {guitar.name}</p>
                  <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
                  <p className="product-info__info">{GuitarType[guitar.type as keyof object]}, {guitar.stringCount} струнная</p>
                </div>
                <div className="cart-item__price">{guitar.price.toLocaleString('ru-RU')} ₽</div>
                <div className="quantity cart-item__quantity">
                  <button className="quantity__button" aria-label="Уменьшить количество" onClick={() => handleCartQuantityDecrease(guitar.id)}>
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="/img/sprite_auto.svg#icon-minus"></use>
                    </svg>
                  </button>
                  <input
                    className="quantity__input"
                    type="number"
                    placeholder={(guitar.guitarQt).toString()}
                    id={guitar.id.toString()}
                    name={`${guitar.id}-count`}
                    min="1"
                    max="99"
                    value={guitar.guitarQt}
                    onFocus={handleInputPriceFocus}
                    onChange={(evt) => handleQuantityInput(evt, guitar.id)}
                  />
                  <button className="quantity__button" aria-label="Увеличить количество" onClick={() => handleCartQuantityIncrease(guitar.id)}>
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="/img/sprite_auto.svg#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <div className="cart-item__price-total">{(guitar.price * guitar.guitarQt).toLocaleString('ru-RU')} ₽</div>
              </div>
            ))}
          </div>
          {guitarsInCart?.length > 0 ?
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="#" onSubmit={handleSubmit}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                      onFocus={handleInputPriceFocus}
                      onKeyDown={handleInputCouponKeyDown}
                      onPaste={handlePaste('coupon')}
                      onChange={handleChange('coupon')}
                      autoComplete="off"
                      value={discount !== 0 ? Discounts.find((item) => item.discountPercent === discount)?.discount : couponPost.coupon}
                    />
                    <p className={discount !== 0 ? 'form-input__message form-input__message--success' : 'form-input__message form-input__message--error'}>{discount !== 0 ? 'Промокод принят' : errors.coupon}&nbsp;</p>
                  </div>
                  <button className="button button--big coupon__button" type="submit">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value" ref={totalCountRef}>{guitarsInCart.map((item) => item.price * item.guitarQt).reduce((previousValue, currentValue) => previousValue + currentValue, 0)} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className={discount === 0 ? 'cart__total-value' : 'cart__total-value cart__total-value--bonus'}>{discount === 0 ? 0 : `-${totalCount / 100 * discount}`} ₽</span>
                </p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                    {discount === 0
                      ? totalCount
                      : totalCount - (totalCount / 100 * discount)} ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button" onClick={(evt) => evt.preventDefault()}>Оформить заказ</button>
              </div>
            </div> :
            <p className="page-content__title title" style={{width:'500px'}}>Корзина пока что пуста. Можно перейти <Link className="link" style={{textDecoration:'underline'}} to={AppRoute.Catalog}>в Каталог</Link> и пополнить корзину.</p>}
        </div>
        {isDeleteModalOpen &&
          <ModalCartDelete
            guitar={guitarsInCart.find((guitar) => guitar.id === Number(guitarIdForDelete))}
            onModalCloseClick={handleDeleteModalCloseClick}
          />}
      </main>
      <Footer />
    </Wrapper>
  );
}

export default CartScreen;
