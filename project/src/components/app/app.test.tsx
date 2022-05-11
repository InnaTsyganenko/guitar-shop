import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {isDataLoaded: true},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  // it('should render "CatalogScreen" when user navigate to "/guitars/page_1"', () => {
  //   history.push(`${AppRoute.Catalog}1`);

  //   render(fakeApp);

  //   expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  //   // expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
  //   // expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
  //   // expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  // });

  // it('should render "ProductScreen" when user navigate to "/guitars/1"', () => {
  //   const pickedId = 1;
  //   history.push(`${AppRoute.Guitars}${pickedId}`);

  //   render(fakeApp);

  //   expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  // });

  it('should render "CartScreen" when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);

    render(fakeApp);

    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });


  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Список страниц/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found.')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
