import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilterAndSort from '../catalog-filter-and-sort/catalog-filter-and-sort';
import Rating from '../rating/rating';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute, GUITARS_COUNT_FOR_RENDER } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getGuitars, getGuitarsTotalCount } from '../../store/guitars-data/selectors';
import { getIdGuitar, setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';
import { fetchGuitarsAction } from '../../store/api-actions';

function Catalog(): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const handlePages = (updatePage: number) => dispatch(setCurrentPageCatalog(updatePage));
  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchGuitarsAction(currentPageCatalog))
        .then(() => {
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        });
    };

    fetchData();
  }, [dispatch, currentPageCatalog]);

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
                    <img src={`/${guitar.previewImg}`} width="75" height="190" alt={`Фото гитары ${guitar.name}`} />
                    <div className="product-card__info">
                      <div className="rate product-card__rate">
                        <Rating rating={guitar.rating} commentsLength={guitar.comments.length} />
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
                page={currentPageCatalog}
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
}


export default Catalog;