import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Rating from '../rating/rating';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import Spinner from '../spinner/spinner';
import { AppRoute, DEFAULT_CATALOG_PAGE, GUITARS_QUANTITY_FOR_DISPLAY } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getGuitars, getStatusLoadedGuitarsSortFIlter, getTotalCountGuitars } from '../../store/guitars-data/selectors';
import { setGuitarId, setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import {
  getSortType,
  getSortDirection,
  getFilterMinPrice,
  getFilterMaxPrice,
  getFilterGuitarType,
  getFilterStringCount
} from '../../store/guitars-data/selectors';
import { fetchGuitarsAction, fetchGuitarsSortFilterAction } from '../../store/api-actions';
import Wrapper from '../wrapper/wrapper';
import { getStatusLoadedGuitars } from '../../store/guitars-data/selectors';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';
import { setLoadGuitarsSortFilter } from '../../store/guitars-data/guitars-data';
import browserHistory from '../../browser-history';

function CatalogScreen(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const history = browserHistory;
  const navigate = useNavigate();

const currentPageCatalog = useAppSelector(getCurrentPageCatalog);
const loadingGuitarsSortFilter = useAppSelector(getStatusLoadedGuitarsSortFIlter);
console.log(loading)
console.log(loadingGuitarsSortFilter)

  const selectedSortType = useAppSelector(getSortType);
  const selectedSortDirection = useAppSelector(getSortDirection);

  const selectedFilterMinPrice = useAppSelector(getFilterMinPrice);
  const selectedFilterMaxPrice = useAppSelector(getFilterMaxPrice);
  const selectedFilterGuitarType = useAppSelector(getFilterGuitarType);
  const selectedFilterStringCount = useAppSelector(getFilterStringCount);

  const guitarsTotalCount = useAppSelector(getTotalCountGuitars);
  const guitars = useAppSelector(getGuitars);
  const totalPages = Math.ceil(guitarsTotalCount / GUITARS_QUANTITY_FOR_DISPLAY);
  const isGuitarsLoaded = useAppSelector(getStatusLoadedGuitars);


  const fetchGuitars = useCallback(async () => {

    await dispatch(fetchGuitarsAction())
      .then(() => {
        setLoading(true);
        setLoad(false);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchGuitars();
    setLoading(false);
  }, [fetchGuitars]);


  const fetchGuitarsSortFilter = useCallback(async () => {
    dispatch(setLoadGuitarsSortFilter(false));
    const a = document.getElementById('1') as HTMLElement;
    if (a) {
      console.log(a);
      a.click();
    }
    console.log(selectedFilterMinPrice);
    console.log(selectedFilterMaxPrice);
    const FilterAndSortOptions = {
      sortType: selectedSortType,
      sortDirection: selectedSortDirection,
      filterMinPrice: selectedFilterMinPrice,
      filterMaxPrice: selectedFilterMaxPrice,
      filterGuitarType: selectedFilterGuitarType,
      filterStringCount: selectedFilterStringCount,
    };

    await dispatch(fetchGuitarsSortFilterAction(FilterAndSortOptions));
  }, [
    dispatch,
    selectedSortType,
    selectedSortDirection,
    selectedFilterMinPrice,
    selectedFilterMaxPrice,
    selectedFilterGuitarType,
    selectedFilterStringCount,
  ]);

  useEffect(() => {
    fetchGuitarsSortFilter();
  }, [fetchGuitarsSortFilter]);

  if (!isGuitarsLoaded) {
    return <LoadingScreen text={'Loading failed.'} />;
  } else if (!loading && load) {
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
              {!loadingGuitarsSortFilter ? <Spinner /> :
                <>
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
                  <CatalogPagination totalPages={totalPages} />
                </>}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    );
  }
}

export default CatalogScreen;
