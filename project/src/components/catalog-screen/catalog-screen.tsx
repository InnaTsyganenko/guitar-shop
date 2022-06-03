/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { setCurrentPageCatalog, setGuitarId } from '../../store/guitars-operations/guitars-operations';
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
import { resetSort, setFilterGuitarType, setFilterMaxPrice, setFilterMinPrice, setFilterStringCount, setLoadGuitarsSortFilter, setSortDirection, setSortType } from '../../store/guitars-data/guitars-data';
import { useSearchParams } from 'react-router-dom';

function CatalogScreen(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadType, setLoadType] = useState<boolean>(true);
  const [loadStrings, setLoadStrings] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);
  const loadingGuitarsSortFilter = useAppSelector(getStatusLoadedGuitarsSortFIlter);

  const selectedSortType: string = useAppSelector(getSortType);
  const selectedSortDirection: string = useAppSelector(getSortDirection);

  const selectedFilterMinPrice: number = useAppSelector(getFilterMinPrice);
  const selectedFilterMaxPrice: number = useAppSelector(getFilterMaxPrice);
  const selectedFilterGuitarType: any = useAppSelector(getFilterGuitarTypes);
  const selectedFilterStringCount: any = useAppSelector(getFilterStringCount);

  const guitars = useAppSelector(getGuitars);
  const isGuitarsLoaded = useAppSelector(getStatusLoadedGuitars);


  if (searchParams.get('sort') && !loading) {
    dispatch(setSortType(searchParams.get('sort')));
  }

  if (searchParams.get('order') && !loading) {
    dispatch(setSortDirection(searchParams.get('order')));
  }

  if (searchParams.get('price_gte') && !loading) {
    dispatch(setFilterMinPrice(searchParams.get('price_gte')));
  }

  if (searchParams.get('price_lte') && !loading) {
    dispatch(setFilterMaxPrice(searchParams.get('price_lte')));
  }

  if ((searchParams.getAll('string_qt').length > 0) && loadStrings) {
    setLoadStrings(false);
    dispatch(setFilterStringCount(searchParams.getAll('string_qt')));
  }

  if ((searchParams.getAll('type').length > 0) && loadType) {
    setLoadType(false);
    dispatch(setFilterGuitarType(searchParams.getAll('type')));
  }

  const fetchGuitars = useCallback(async () => {
    await dispatch(fetchGuitarsAction())
      .then(() => {
        setLoading(true);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchGuitars();
    setLoading(false);
  }, [fetchGuitars]);

  const FilterAndSortOptions = {
    sortType: selectedSortType,
    sortOrder: selectedSortDirection,
    priceMin: Number(selectedFilterMinPrice),
    priceMax: Number(selectedFilterMaxPrice),
    guitarTypes: selectedFilterGuitarType,
    stringQt: selectedFilterStringCount,
  };

  const adaptSearchParams = (params: any) => {
    const adaptedMovie = {...params,
      sort: params.sortType,
      order: params.sortOrder,
      price_gte: params.priceMin,
      price_lte: params.priceMax,
      type: params.guitarTypes,
      string_qt: params.stringQt,
    };

    delete adaptedMovie.sortType;
    delete adaptedMovie.sortOrder;
    delete adaptedMovie.priceMin;
    delete adaptedMovie.priceMax;
    delete adaptedMovie.guitarTypes;
    delete adaptedMovie.stringQt;

    Object.keys(adaptedMovie).map((item: any) => ((adaptedMovie[item] === '') || (adaptedMovie[item] === 0) || (adaptedMovie[item]?.length === 0)) ?
      delete adaptedMovie[item] : null);

    return adaptedMovie;
  };

  const params = adaptSearchParams(FilterAndSortOptions);

  const fetchGuitarsSortFilter = useCallback(async () => {
    dispatch(setLoadGuitarsSortFilter(false));

    setSearchParams(params);

    const searchString = new URLSearchParams(location.search);

    if (currentPageCatalog !== DEFAULT_CATALOG_PAGE) {
      dispatch(setCurrentPageCatalog(DEFAULT_CATALOG_PAGE));
    }

    navigate({
      pathname: `${AppRoute.Catalog}${currentPageCatalog}`,
      search: searchString.toString(),
    });

    await dispatch(fetchGuitarsSortFilterAction(FilterAndSortOptions));
    //eslint-disable-next-line react-hooks/exhaustive-deps
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


  const guitarsTotalCount = useAppSelector(getTotalCountGuitars);
  const totalPages = Math.ceil(guitarsTotalCount / GUITARS_QUANTITY_FOR_DISPLAY);

  useEffect(() => {
    setSearchParams(params);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const displayDummy = () => {
    dispatch(resetSort());
    return <p className="page-content__title title" style={{width:'500px'}}>К сожалению, таких гитар в базе данных нет. Попробуйте изменить параметры фильтра.</p>;
  };

  if (!isGuitarsLoaded) {
    return <LoadingScreen text={'Loading failed.'} />;
  } else if (!loading) {
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
                    {(guitars.length === 0) ? displayDummy() : ''}
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
