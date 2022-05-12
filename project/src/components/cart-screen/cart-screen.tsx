import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';

function CartScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs guitarId={0} guitarName={''} />
          <div className="cart">
            <div className="cart-item">
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={(evt) => evt.preventDefault()}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
              </button>
              <div className="cart-item__image"><img src="/img/guitar-2.jpg" width="55" height="130" alt="ЭлектроГитара Честер bass" />
              </div>
              <div className="product-info cart-item__info">
                <p className="product-info__title">ЭлектроГитара Честер bass</p>
                <p className="product-info__info">Артикул: SO757575</p>
                <p className="product-info__info">Электрогитара, 6 струнная</p>
              </div>
              <div className="cart-item__price">17 500 ₽</div>
              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество" onClick={(evt) => evt.preventDefault()}>
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="../img/sprite_auto.svg#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
                <button className="quantity__button" aria-label="Увеличить количество" onClick={(evt) => evt.preventDefault()}>
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="../img/sprite_auto.svg#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">17 500 ₽</div>
            </div>
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button" onClick={(evt) => evt.preventDefault()}>Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button" onClick={(evt) => evt.preventDefault()}>Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartScreen;
