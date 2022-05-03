import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE_CATALOG, GUITARS_COUNT_FOR_RENDER } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getGuitars } from '../../store/guitars-data/selectors';
import { getIdGuitar } from '../../store/guitars-operations/guitars-operations';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogFilterAndSort from '../catalog-filter-and-sort/catalog-filter-and-sort';
import { useState } from 'react';
import { fetchGuitarsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingScreen from '../loading-screen/loading-screen';
import { getGuitarsTotalCount } from '../../store/guitars-data/selectors';

function Catalog(): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE_CATALOG);

  const dispatch = useAppDispatch();

  const handlePages = (updatePage: number) => setPage(updatePage);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGuitarsAction(page))
        .then(() => {
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        });
    };

    fetchData();
  }, [dispatch, page]);

  const guitarsTotalCount = useAppSelector(getGuitarsTotalCount);
  const guitars = useAppSelector(getGuitars);
  const totalPages = Math.ceil(guitarsTotalCount / GUITARS_COUNT_FOR_RENDER);

  if (error) {
    return (
      <div className="wrapper">
        <main className="page-content">
          <div className="container">
            {toast(error)}
          </div>
        </main>
      </div>);
  } else if (!isLoaded) {
    return <LoadingScreen />;
  } else {

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
              {guitars.map((guitar) => (
                <div className="product-card" key={guitar.id}>
                  <img src={guitar.previewImg} width="75" height="190" alt={`Фото гитары ${guitar.name}`} />
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
                      to={`${AppRoute.Guitars}${guitar.id}`}
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
  )};
}


export default Catalog;
