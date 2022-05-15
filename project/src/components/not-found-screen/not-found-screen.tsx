import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import Wrapper from '../wrapper/wrapper';

function NotFoundScreen() {
  return (
    <Wrapper>
      <main className="page-content">
        <div className="container">
          <p>Oooops!</p>
          <h2>404. Page not found.</h2>
          <h3><Link to={AppRoute.Root} style={{opacity: '50%', textDecoration: 'underline'}}>Вернуться на главную</Link>?</h3>
        </div>
      </main>
    </Wrapper>
  );
}

export default NotFoundScreen;
