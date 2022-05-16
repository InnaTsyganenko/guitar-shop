import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { AppRoute, DEFAULT_CATALOG_PAGE, STEP_ONE } from '../../const';

type CatalogPaginatioProps = PropsWithChildren<{
  page: number;
  totalPages: number;
  onPaginationClick: (page: number) => void;
}>;

function CatalogPagination({page, totalPages, onPaginationClick}: CatalogPaginatioProps): JSX.Element {

  const dispatch = useAppDispatch();

  const countPages = [DEFAULT_CATALOG_PAGE];

  while (countPages.length < totalPages) {
    countPages.push(countPages.length + DEFAULT_CATALOG_PAGE);
  }

  if (countPages.length === DEFAULT_CATALOG_PAGE) {
    return <div data-testid="div"></div>;
  } else {
    return (
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          {(window.location.pathname !== `${AppRoute.Catalog}${DEFAULT_CATALOG_PAGE}`) && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <Link
                className="link pagination__page-link"
                onClick={() => {
                  onPaginationClick(page - STEP_ONE);
                  dispatch(setCurrentPageCatalog(page - STEP_ONE));
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
                  onPaginationClick(item);
                  dispatch(setCurrentPageCatalog(item));
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
                  onPaginationClick(page + STEP_ONE);
                  dispatch(setCurrentPageCatalog(page + STEP_ONE));
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
