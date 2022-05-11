import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogPagination from './catalog-pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ArtistQuestionScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CatalogPagination
            page={1}
            totalPages={3}
            handlePagination={jest.fn()}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
