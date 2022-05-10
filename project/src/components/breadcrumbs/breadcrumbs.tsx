import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { GuitarName } from '../../types/guitars';
import { useAppSelector } from '../../hooks';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';

type BreadcrumbsProps = PropsWithChildren<{
  guitarName: GuitarName;
}>;

function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  const {guitarName} = props;

  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={`${AppRoute.Catalog}${currentPageCatalog}`}>Каталог</Link>
      </li>
      {(window.location.pathname.includes(AppRoute.Guitars)) ?
        <li className="breadcrumbs__item">
          <Link className="link" to="##">{guitarName}</Link>
        </li> : ''}
      {(window.location.pathname.includes(AppRoute.Cart)) ?
        <li className="breadcrumbs__item">
          <Link className="link" to="##">Корзина</Link>
        </li> : ''}
    </ul>
  );
}

export default Breadcrumbs;
