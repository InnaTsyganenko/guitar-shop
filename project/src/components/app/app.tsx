import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {AppRoute} from '../../const';
import CatalogScreen from '../catalog/catalog';
import Cart from '../cart/cart';
import Product from '../product/product';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <CatalogScreen />
        </Route>
        <Route exact path={AppRoute.CART} >
          <Cart />
        </Route>
        <Route exact path={AppRoute.GUITARS} >
          <Product />
        </Route>
        <Route >
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
