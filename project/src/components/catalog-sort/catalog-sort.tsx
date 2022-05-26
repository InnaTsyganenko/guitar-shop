import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType, setSortDirection } from '../../store/guitars-data/guitars-data';
import { getSortType, getSortDirection } from '../../store/guitars-data/selectors';
import { ListSortTypes, ListSortDirections } from '../../const';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedSortType = useAppSelector(getSortType);
  const selectedSortDirection = useAppSelector(getSortDirection);

  const handleSortKeyChange = (sortType: string) => {
    if (selectedSortDirection === '') {
      dispatch(setSortDirection(ListSortDirections[0].value));
    }
    dispatch(setSortType(sortType));
  };

  const handleDirectionToggle = (sortDirection: string) => {
    if (selectedSortType === '') {
      dispatch(setSortType(ListSortTypes[0].value));
    }
    dispatch(setSortDirection(sortDirection));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {ListSortTypes.map((item) => <button key={item.value} className={item.value === selectedSortType ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'} aria-label={item.label} onClick={() => handleSortKeyChange(item.value)}>{item.label}</button>)}
      </div>
      <div className="catalog-sort__order">
        {ListSortDirections.map((item) => <button key={item.label} className={`catalog-sort__order-button ${item.value === selectedSortDirection ? 'catalog-sort__order-button--active' : ''} ${item.class}`} aria-label={item.label} onClick={() => handleDirectionToggle(item.value)}></button>)}
      </div>
    </div>
  );
}

export default CatalogSort;
