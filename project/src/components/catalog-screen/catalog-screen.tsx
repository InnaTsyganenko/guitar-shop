import { Link } from 'react-router-dom';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Rating from '../rating/rating';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute, GUITARS_QUANTITY_FOR_DISPLAY } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getGuitars, getTotalCountGuitars } from '../../store/guitars-data/selectors';
import { setGuitarId, setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { getSortType, getSortDirection } from '../../store/guitars-data/selectors';
import { fetchGuitarsAction } from '../../store/api-actions';
import Wrapper from '../wrapper/wrapper';
import { useApiGet, TApiResponse } from '../../hooks/use-api-get';
import { getStatusLoadedGuitars } from '../../store/guitars-data/selectors';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleUpdatePageCatalog = (updatePage: number) => dispatch(setCurrentPageCatalog(updatePage));
  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);
  const selectedSortType = useAppSelector(getSortType);
  const selectedSortDirection = useAppSelector(getSortDirection);

  const data: TApiResponse = useApiGet(selectedSortType, fetchGuitarsAction);

  const guitarsTotalCount = useAppSelector(getTotalCountGuitars);
  const guitars = useAppSelector(getGuitars);
  const totalPages = Math.ceil(guitarsTotalCount / GUITARS_QUANTITY_FOR_DISPLAY);
  const isGuitarsLoaded = useAppSelector(getStatusLoadedGuitars);

  if (!isGuitarsLoaded) {
    return <LoadingScreen text={'Loading failed.'} />;
  } else if (!data.loading) {
    return <LoadingScreen text={'Loading...'} />;
  } else {
    return (
      <Wrapper>
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <Breadcrumbs guitarId={0} guitarName={''} />
            <div className="catalog">
              <CatalogFilter />
              <CatalogSort />
              <div className="cards catalog__cards">
                {guitars.slice(currentPageCatalog * GUITARS_QUANTITY_FOR_DISPLAY - GUITARS_QUANTITY_FOR_DISPLAY, currentPageCatalog * GUITARS_QUANTITY_FOR_DISPLAY).map((guitar) => (
                  <div className="product-card" key={guitar.id}>
                    <img src={`/${guitar.previewImg}`} width="75" height="190" alt={`Фото гитары ${guitar.name}`} />
                    <div className="product-card__info">
                      <div className="rate product-card__rate">
                        <Rating
                          rating={guitar.rating}
                          commentsLength={guitar.comments.length}
                          isRatingWithCountReviews
                        />
                      </div>
                      <p className="product-card__title">{guitar.name}</p>
                      <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
                      </p>
                    </div>
                    <div className="product-card__buttons">
                      <Link
                        className="button button--mini"
                        aria-label="Корзина"
                        onClick={() => dispatch(setGuitarId(guitar.id))}
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
                onPaginationClick={handleUpdatePageCatalog}
              />
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    );
  }
}

export default CatalogScreen;
