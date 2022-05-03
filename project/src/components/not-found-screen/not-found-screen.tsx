import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';

function NotFoundScreen() {
  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);

  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <p>Oooops!</p>
          <h2>404. The page does not exist.</h2>
          <h3>Go to <Link to={`${AppRoute.Catalog}${currentPageCatalog}`} style={{opacity: '50%', textDecoration: 'underline'}}> catalog page</Link>?</h3>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
