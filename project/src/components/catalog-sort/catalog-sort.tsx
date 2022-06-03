import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType, setSortDirection, resetSort } from '../../store/guitars-data/guitars-data';
import { getSortType, getSortDirection, getTotalCountGuitars } from '../../store/guitars-data/selectors';
import { ListSortTypes, ListSortDirections } from '../../const';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedSortType = useAppSelector(getSortType);
  const selectedSortDirection = useAppSelector(getSortDirection);
  const guitarsQt = useAppSelector(getTotalCountGuitars);

  const handleSortKeyChange = (sortType: string) => {
    if (guitarsQt <= 1) {
      dispatch(resetSort());
      return;
    }
    if (selectedSortDirection === '') {
      dispatch(setSortDirection(ListSortDirections[0].value));
    }
    dispatch(setSortType(sortType));
  };

  const handleDirectionToggle = (sortDirection: string) => {
    if (guitarsQt <= 1) {
      dispatch(resetSort());
      return;
    }

    if (selectedSortType === '') {
      dispatch(setSortType(ListSortTypes[0].value));
    }
    dispatch(setSortDirection(sortDirection));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {ListSortTypes.map((item) => <button key={item.value} className={(guitarsQt <= 1) && item.value === selectedSortType ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'} aria-label={item.label} onClick={() => handleSortKeyChange(item.value)}>{item.label}</button>)}
      </div>
      <div className="catalog-sort__order">
        {ListSortDirections.map((item) => <button key={item.label} className={`catalog-sort__order-button ${(guitarsQt <= 1) && item.value === selectedSortDirection ? 'catalog-sort__order-button--active' : ''} ${item.class}`} aria-label={item.label} onClick={() => handleDirectionToggle(item.value)}></button>)}
      </div>
    </div>
  );
}

export default CatalogSort;
