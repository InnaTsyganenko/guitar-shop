import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Cart(): JSX.Element {
  return <p>cart!</p>;
}

function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
      </li>
      {window.location.pathname === AppRoute.Guitars ?
        <li className="breadcrumbs__item"><a className="link" href="##">Товар</a></li> : ''}
    </ul>
  );
}


export default Breadcrumbs;
