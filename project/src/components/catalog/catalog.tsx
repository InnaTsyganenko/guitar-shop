import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitars-data/selectors';

function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
              </div>
            </div>
            {guitars.map((guitar) => (
              <div className="cards catalog__cards" key={guitar.id}>
                <div className="product-card"><img src={guitar.previewImg} srcSet="img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt={guitar.name} />
                  <div className="product-card__info">
                    <div className="rate product-card__rate">
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="img/sprite_auto.svg#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="img/sprite_auto.svg#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="img/sprite_auto.svg#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="img/sprite_auto.svg#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="img/sprite_auto.svg#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Рейтинг: Хорошо</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
                    </div>
                    <p className="product-card__title">{guitar.name}</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
                    </p>
                  </div>
                  <div className="product-card__buttons">
                    <Link className="button button--mini" to={AppRoute.GUITARS} aria-label="Корзина">Подробнее</Link>
                    <a className="button button--red button--mini button--add-to-cart" href="##" onClick={(evt) => evt.preventDefault()}>Купить</a>
                  </div>
                </div>
              </div>
            ))}
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default Catalog;
