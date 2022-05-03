import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import CatalogScreen from '../catalog/catalog';
import Cart from '../cart/cart';
import Product from '../product/product';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {useAppSelector} from '../../hooks';
import {getLoadedDataStatus} from '../../store/guitars-data/selectors';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainScreen />}
      />
      <Route
        path={AppRoute.Catalog}
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.Cart}
        element={<Cart />}
      />
      <Route
        path={AppRoute.Guitars}
        element={<Product />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
