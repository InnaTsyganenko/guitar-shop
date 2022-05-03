import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE_CATALOG, GUITARS_COUNT_FOR_RENDER } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getGuitars } from '../../store/guitars-data/selectors';
import { getIdGuitar } from '../../store/guitars-operations/guitars-operations';
import { getPickedId } from '../../store/guitars-operations/selectors';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogFilterAndSort from '../catalog-filter-and-sort/catalog-filter-and-sort';
import { useState } from 'react';

function Catalog(): JSX.Element {

  const guitars = useAppSelector(getGuitars);
  const pickedId = useAppSelector(getPickedId);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(DEFAULT_PAGE_CATALOG);
  const totalPages = Math.ceil(guitars.length / GUITARS_COUNT_FOR_RENDER);
  const handlePages = (updatePage: number) => setPage(updatePage);
  let renderedGuitarCount = 0;

  if (page !== DEFAULT_PAGE_CATALOG) {
    renderedGuitarCount = (renderedGuitarCount + GUITARS_COUNT_FOR_RENDER);
  }

  console.log(page);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs guitarName={''} />
          <div className="catalog">
            <CatalogFilterAndSort />
            <div className="cards catalog__cards">
              {guitars.slice(renderedGuitarCount, renderedGuitarCount + GUITARS_COUNT_FOR_RENDER).map((guitar) => (
                <div className="product-card" key={guitar.id}>
                  <img src={guitar.previewImg} srcSet="img/content/catalog-product-2@2x.jpg 2x" width="75" height="190" alt={`Фото гитары ${guitar.name}`} />
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
                    <Link
                      className="button button--mini"
                      aria-label="Корзина"
                      onClick={() => {
                        dispatch(getIdGuitar(guitar.id));
                      }}
                      to={`${AppRoute.Guitars}${pickedId}`}
                    >Подробнее
                    </Link>
                    <a className="button button--red button--mini button--add-to-cart" href="##" onClick={(evt) => evt.preventDefault()}>Купить</a>
                  </div>
                </div>
              ))}
            </div>
            <CatalogPagination
              page={page}
              totalPages={totalPages}
              handlePagination={handlePages}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default Catalog;
