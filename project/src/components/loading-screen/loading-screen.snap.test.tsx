import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';
import HistoryRouter from '../history-route/history-route';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {container} = render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
