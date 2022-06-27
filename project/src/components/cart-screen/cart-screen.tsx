import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Wrapper from '../wrapper/wrapper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarsInCart } from '../../store/guitars-operations/selectors';
import { GuitarType } from '../../const';
import { decreaseGuitarCartQt, deleteGuitarFromCart, increaseGuitarCartQt } from '../../store/guitars-operations/guitars-operations';
import { useCallback, useRef, useState } from 'react';
import { useForm } from '../../hooks/use-form';
import { pushCouponAction } from '../../store/api-actions';
import { CouponPost } from '../../types/state';
import { getDiscountFromCoupon } from '../../store/guitars-data/selectors';

function CartScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const totalCountRef = useRef<HTMLElement>(null);

  const guitarsInCart = useAppSelector(getGuitarsInCart);

  const handleCartDeleteButton = (id: number) => dispatch(deleteGuitarFromCart(id));

  const handleCartQuantityIncrease = (id: number) => {
    if (guitarsInCart.find((item) => item.id === id)?.guitarQt === 99) {
      return;
    }

    dispatch(increaseGuitarCartQt(id));
  };

  const handleCartQuantityDecrease = (id: number) => {
    if (guitarsInCart.find((item) => item.id === id)?.guitarQt === 1) {
      dispatch(deleteGuitarFromCart(id));
    } else {
      dispatch(decreaseGuitarCartQt(id));
    }
  };

  const fetchCoupon = useCallback(async (couponPost) => {
    await dispatch(pushCouponAction(couponPost));
  }, [dispatch]);

  const { handleSubmit, handleChange, data: couponPost, errors } = useForm<CouponPost>({
    validations: {
      coupon: {
        custom: {
          isValid: (value) => value.length > 0,
          message: 'неверный промокод',
        },
      },
    },
    onSubmit: () => {
      fetchCoupon(couponPost);
    },
  });

  const discount = dispatch(getDiscountFromCoupon as any);
  // const discount = 0;

  console.log(discount)
  return (
    <Wrapper>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs guitarId={0} guitarName={''} />
          <div className="cart">
            {guitarsInCart.map((guitar) => (
              <div key={guitar.id} className="cart-item">
                <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => handleCartDeleteButton(guitar.id)}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
                </button>
                <div className="cart-item__image"><img src="/img/guitar-2.jpg" width="55" height="130" alt="ЭлектроГитара Честер bass" />
                </div>
                <div className="product-info cart-item__info">
                  <p className="product-info__title">{GuitarType[guitar.type as keyof object]} {guitar.name}</p>
                  <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
                  <p className="product-info__info">{GuitarType[guitar.type as keyof object]}, {guitar.stringCount} струнная</p>
                </div>
                <div className="cart-item__price">{guitar.price} ₽</div>
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
                    onChange={(evt) => evt.preventDefault()}
                  />
                  <button className="quantity__button" aria-label="Увеличить количество" onClick={() => handleCartQuantityIncrease(guitar.id)}>
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="/img/sprite_auto.svg#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <div className="cart-item__price-total">{guitar.price * guitar.guitarQt} ₽</div>
              </div>
            ))}
          </div>
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
                    onChange={handleChange('coupon')}
                  />
                  <p className={errors.coupon === '' ? 'form-input__message form-input__message--success' : 'form-input__message form-input__message--error'}>{errors.coupon === '' ? 'Промокод принят' : errors.coupon}&nbsp;</p>
                </div>
                <button className="button button--big coupon__button" type="submit">Применить</button>
              </form>
            </div>
            {guitarsInCart.length > 0 ?
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value" ref={totalCountRef}>{guitarsInCart.map((item) => item.price * item.guitarQt).reduce((previousValue, currentValue) => previousValue + currentValue, 0)} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className={discount === 0 ? 'cart__total-value' : 'cart__total-value cart__total-value--bonus'}>{discount === 0 ? '0' : `-${discount}`} ₽</span>
                </p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{Number(totalCountRef.current?.innerText.match(/\d+/g)?.join('')) - Number(discount)} ₽</span></p>
                <button className="button button--red button--big cart__order-button" onClick={(evt) => evt.preventDefault()}>Оформить заказ</button>
              </div> : ''}
          </div>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
}

export default CartScreen;
