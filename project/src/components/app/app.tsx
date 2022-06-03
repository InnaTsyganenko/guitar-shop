import { Route, Routes } from 'react-router-dom';
import { AppRoute, DEFAULT_CATALOG_PAGE } from '../../const';
import MainScreen from '../main-screen/main-screen';
import CatalogScreen from '../catalog-screen/catalog-screen';
import CartScreen from '../cart-screen/cart-screen';
import ProductScreen from '../product-screen/product-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import { getPickedId } from '../../store/guitars-operations/selectors';
import browserHistory from '../../browser-history';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../store/guitars-data/guitars-data';
import { setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';

function App(): JSX.Element {
  const pickedId = useAppSelector(getPickedId);
  const dispatch = useDispatch();

  browserHistory.listen((location) =>  {
    if (location.location.pathname === AppRoute.Root) {
      dispatch(resetFilters());
      dispatch(setCurrentPageCatalog(DEFAULT_CATALOG_PAGE));
    }
  });

  return (
    <Routes>
      <Route
        path={`${AppRoute.Guitars}${pickedId}`}
        element={<ProductScreen />}
      />
      <Route
        path={`${AppRoute.Catalog}`}
        element={<CatalogScreen />}
      />
      <Route
        path={`${AppRoute.Catalog}:id`}
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartScreen />}
      />
      <Route
        path={AppRoute.Root}
        element={<MainScreen />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
