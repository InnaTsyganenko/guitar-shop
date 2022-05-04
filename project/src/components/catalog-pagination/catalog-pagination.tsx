import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { getCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { AppRoute, DEFAULT_PAGE_CATALOG, STEP_ONE } from '../../const';

type CatalogPaginatioProps = PropsWithChildren<{
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}>;

function CatalogPagination(props: CatalogPaginatioProps): JSX.Element {
  const {page, totalPages, handlePagination} = props;

  const dispatch = useAppDispatch();

  const countPages = [DEFAULT_PAGE_CATALOG];

  while (countPages.length < totalPages) {
    countPages.push(countPages.length + DEFAULT_PAGE_CATALOG);
  }

  if (countPages.length === DEFAULT_PAGE_CATALOG) {
    return <div></div>;
  } else {
    return (
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          {(window.location.pathname !== `${AppRoute.Catalog}${DEFAULT_PAGE_CATALOG}`) && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <Link
                className="link pagination__page-link"
                onClick={() => {
                  handlePagination(page - STEP_ONE);
                  dispatch(getCurrentPageCatalog(page - STEP_ONE));
                }}
                to={`${AppRoute.Catalog}${page - STEP_ONE}`}
              >Назад
              </Link>
            </li>
          )}

          {countPages.map((item) => (
            <li
              className={(window.location.pathname === `${AppRoute.Catalog}${item}`) ?
                'pagination__page pagination__page--active' :
                'pagination__page'}
              key={item}
            >
              <Link
                className="link pagination__page-link"
                onClick={() => {
                  handlePagination(item);
                  dispatch(getCurrentPageCatalog(item));
                }}
                to={`${AppRoute.Catalog}${item}`}
              >{item}
              </Link>
            </li>
          ))}

          {(window.location.pathname !== `${AppRoute.Catalog}${totalPages}`) && (
            <li className="pagination__page pagination__page--next" id="next">
              <Link
                className="link pagination__page-link"
                onClick={() => {
                  handlePagination(page + STEP_ONE);
                  dispatch(getCurrentPageCatalog(page + STEP_ONE));
                }}
                to={`${AppRoute.Catalog}${page + STEP_ONE}`}
              >Далее
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default CatalogPagination;
