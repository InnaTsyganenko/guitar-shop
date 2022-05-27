import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPageCatalog } from '../../store/guitars-operations/guitars-operations';
import { AppRoute, DEFAULT_CATALOG_PAGE, STEP_ONE } from '../../const';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';

type CatalogPaginatioProps = PropsWithChildren<{
  totalPages: number;
}>;

function CatalogPagination({totalPages}: CatalogPaginatioProps): JSX.Element {

  const dispatch = useAppDispatch();

  const currentPageCatalog = useAppSelector(getCurrentPageCatalog);

  const countPages = [DEFAULT_CATALOG_PAGE];

  while (countPages.length < totalPages) {
    countPages.push(countPages.length + DEFAULT_CATALOG_PAGE);
  }

  const handlePaginationBtnClick = (updatePage: number) => {
    dispatch(setCurrentPageCatalog(updatePage));
  };

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
                onClick={() => handlePaginationBtnClick(currentPageCatalog - STEP_ONE)}
                to={`${AppRoute.Catalog}${currentPageCatalog - STEP_ONE}`}
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
                onClick={() => handlePaginationBtnClick(item)}
                to={`${AppRoute.Catalog}${item}`}
              >{item}
              </Link>
            </li>
          ))}

          {(window.location.pathname !== `${AppRoute.Catalog}${totalPages}`) && (
            <li className="pagination__page pagination__page--next" id="next">
              <Link
                className="link pagination__page-link"
                onClick={() => handlePaginationBtnClick(currentPageCatalog + STEP_ONE)}
                to={`${AppRoute.Catalog}${currentPageCatalog + STEP_ONE}`}
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
