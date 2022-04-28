import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Cart(): JSX.Element {
  return <p>cart!</p>;
}

function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="##" onClick={(evt) => evt.preventDefault()}>Главная</a>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.ROOT}>Каталог</Link>
      </li>
      {window.location.pathname === AppRoute.GUITARS ?
        <li className="breadcrumbs__item"><a className="link" href="##">Товар</a></li> : ''}
    </ul>
  );
}


export default Breadcrumbs;
