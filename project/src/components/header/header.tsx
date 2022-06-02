import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';
import HeaderSearch from '../header-search/header-search';

function Header(): JSX.Element {
  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Root}>
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className={window.location.pathname.includes(AppRoute.Catalog) ?
                'link main-nav__link link--current' :
                'link main-nav__link'}
              to={`${AppRoute.Catalog}${currentPageCatalog}`}
              >Каталог
              </Link>
            </li>
            <li>
              <a className="link main-nav__link" href="##" onClick={(evt) => evt.preventDefault()}>Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="##" onClick={(evt) => evt.preventDefault()}>О компании</a>
            </li>
          </ul>
        </nav>
        <HeaderSearch />
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="/img/sprite_auto.svg#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">1</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
