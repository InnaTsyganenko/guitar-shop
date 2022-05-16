import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import CatalogScreen from '../catalog-screen/catalog-screen';
import CartScreen from '../cart-screen/cart-screen';
import ProductScreen from '../product-screen/product-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import { getCurrentPageCatalog, getPickedId } from '../../store/guitars-operations/selectors';

function App(): JSX.Element {
  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);
  const pickedId = useAppSelector(getPickedId);

  return (
    <Routes>
      <Route
        path={`${AppRoute.Catalog}${currentPageCatalog}`}
        element={<CatalogScreen />}
      />
      <Route
        path={`${AppRoute.Guitars}${pickedId}`}
        element={<ProductScreen />}
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
