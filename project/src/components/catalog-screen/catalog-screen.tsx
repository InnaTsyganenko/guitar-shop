/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
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
  getFilterGuitarTypes,
  getFilterStringCount
} from '../../store/guitars-data/selectors';
import { fetchGuitarsAction, fetchGuitarsSortFilterAction } from '../../store/api-actions';
import Wrapper from '../wrapper/wrapper';
import { getStatusLoadedGuitars } from '../../store/guitars-data/selectors';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';
import { resetFilters, resetSearch, resetSort, setLoadGuitarsSortFilter } from '../../store/guitars-data/guitars-data';
import browserHistory from '../../browser-history';
import { useParams, useSearchParams, generatePath } from 'react-router-dom';

function CatalogScreen(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const history = browserHistory;
  const navigate = useNavigate();


  let pageCatalog = useParams();
  let [searchParams, setSearchParams] = useSearchParams();


  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);
  const loadingGuitarsSortFilter = useAppSelector(getStatusLoadedGuitarsSortFIlter);
  // console.log(pageCatalog);

  const selectedSortType: string = useAppSelector(getSortType);
  const selectedSortDirection: string = useAppSelector(getSortDirection);

  const selectedFilterMinPrice: number = useAppSelector(getFilterMinPrice);
  const selectedFilterMaxPrice: number = useAppSelector(getFilterMaxPrice);
  const selectedFilterGuitarType: any = useAppSelector(getFilterGuitarTypes);
  const selectedFilterStringCount: any = useAppSelector(getFilterStringCount);

  const guitars = useAppSelector(getGuitars);
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

  const FilterAndSortOptions = {
    sortType: selectedSortType,
    sortOrder: selectedSortDirection,
    priceMin: selectedFilterMinPrice,
    priceMax: selectedFilterMaxPrice,
    guitarTypes: selectedFilterGuitarType,
  };

  const adaptSearchParams = (params: any) => {
    const adaptedMovie = {...params,
      sort: params.sortType,
      order: params.sortOrder,
      price_gte: params.priceMin,
      price_lte: params.priceMax,
      type: params.guitarTypes,
    };

    delete adaptedMovie.sortType;
    delete adaptedMovie.sortOrder;
    delete adaptedMovie.priceMin;
    delete adaptedMovie.priceMax;
    delete adaptedMovie.guitarTypes;

    Object.keys(adaptedMovie).map((item: any) => {
      if ((adaptedMovie[item] === '') || (adaptedMovie[item] === 0) || (adaptedMovie[item].length === 0)) {
        delete adaptedMovie[item];
      }
    });

    return adaptedMovie;
  };

  const params = adaptSearchParams(FilterAndSortOptions);

  console.log();

  const fetchGuitarsSortFilter = useCallback(async () => {
    dispatch(setLoadGuitarsSortFilter(false));

    const paginationFirstButton = document.getElementById('1') as HTMLElement;
    if (paginationFirstButton) {
      paginationFirstButton.click();
    }
    // dispatch(setCurrentPageCatalog(1));
    setSearchParams(params);

    await dispatch(fetchGuitarsSortFilterAction(FilterAndSortOptions)).then(() => {
      // if (paginationFirstButton) {
      //   paginationFirstButton.click();
      // }
      // dispatch(setCurrentPageCatalog(1));
      // setSearchParams(params);
    });
  }, [
    dispatch,
    selectedSortType,
    selectedSortDirection,
    selectedFilterMinPrice,
    selectedFilterMaxPrice,
    selectedFilterGuitarType,
  ]);

  useEffect(() => {
    fetchGuitarsSortFilter();
  }, [fetchGuitarsSortFilter]);

  const filtredGuitarsByStrings = guitars.filter((guitar) => selectedFilterStringCount.includes((guitar.stringCount).toString() as keyof object));
  // console.log((filtredGuitarsByStrings.length === 0) && (guitars.length === 0))

  const guitarsTotalCount = useAppSelector(getTotalCountGuitars);
  const totalPages = Math.ceil((selectedFilterStringCount.length === 0 ? guitarsTotalCount : filtredGuitarsByStrings.length) / GUITARS_QUANTITY_FOR_DISPLAY);

  useEffect(() => {
    console.log('location evt')
    dispatch(resetSort());
    dispatch(resetFilters());
  }, [location]);

  useEffect(() => {
    console.log('navigate evt')
    setSearchParams(params);
  }, [navigate]);


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
                    {(filtredGuitarsByStrings.length === 0) && (guitars.length === 0) ?
                      <p className="page-content__title title" style={{width:'500px'}}>К сожалению, таких гитар в базе данных нет. Попробуйте изменить параметры фильтра.</p> : ''}
                    {(selectedFilterStringCount.length === 0 ?
                      guitars : filtredGuitarsByStrings).slice(currentPageCatalog * GUITARS_QUANTITY_FOR_DISPLAY - GUITARS_QUANTITY_FOR_DISPLAY, currentPageCatalog * GUITARS_QUANTITY_FOR_DISPLAY).map((guitar) => (
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
                          <p className="product-card__title">{guitar.stringCount}</p>
                          <p className="product-card__title">{guitar.type}</p>
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
