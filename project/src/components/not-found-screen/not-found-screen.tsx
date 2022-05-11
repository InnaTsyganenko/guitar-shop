import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen() {
  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <p>Oooops!</p>
          <h2>404. Page not found.</h2>
          <h3><Link to={AppRoute.Root} style={{opacity: '50%', textDecoration: 'underline'}}>Вернуться на главную</Link>?</h3>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
