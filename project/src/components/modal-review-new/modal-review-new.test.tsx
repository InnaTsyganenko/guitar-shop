import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalReviewNew from './modal-review-new';
import { Guitar } from '../../types/guitars';

const makeFakeGuitar = (): Guitar => ({
  id: 1,
  name: 'string',
  vendorCode: 'string',
  type: 'string',
  description: 'string',
  previewImg: 'string',
  stringCount: 'string',
  rating: 5,
  price: 15000,
  comments: [],
} as Guitar);

const mockStore = configureMockStore();

const guitar = makeFakeGuitar();

const store = mockStore({
  DATA: {isDataLoaded: true, guitar},
  GUITARS: {pickedId: 1, currentPageCatalog: 1, guitar},
});


describe('Component: ModalReviewNew', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReviewNew onModalReviewNewCloseClick={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});

