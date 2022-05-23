import { PropsWithChildren, useCallback, useState } from 'react';
import { Guitars, Guitar } from '../../types/guitars';
import { useSort } from '../../hooks/use-sort';
import { SortOption } from "../../types/state";
import { useAppDispatch } from '../../hooks';
import { setSortType, setSortDirection } from '../../store/guitars-data/guitars-data';


function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();

  const listSortOptions = [
    { label: 'по цене', value: 'price' },
    { label: 'по популярности', value: 'rating' },
  ];

  const listSortDirections = [
    { label: 'По возрастанию', class: 'catalog-sort__order-button catalog-sort__order-button--up', value: 'asc' },
    { label: 'По убыванию', class: 'catalog-sort__order-button catalog-sort__order-button--down', value: 'desc' },
  ];

  // const fetchGuitarsSort = useCallback(async () => {
  //   let response = await fetch(`https://guitar-shop.accelerator.pages.academy/guitars?_sort=${sortKey}&_order=${sortDirection}`);
  //   // response = await response.json();
  //   console.log(response);

  //   // const filtredGuitars = response.filter((item: Guitar) => item.name);
  //   dispatch(loadSortedGuitars(response));
  // }, [dispatch]);

  const handleSortKeyChange = (selectedSortType: any) => {
    console.log(selectedSortType);
    dispatch(setSortType(selectedSortType));
  };

  const handleDirectionToggle = (selectedSortDirection: any) => {
    console.log(selectedSortDirection);
    dispatch(setSortDirection(selectedSortDirection));
  };


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {listSortOptions.map((item) => <button key={item.value} className="catalog-sort__type-button" aria-label={item.label} onClick={() => handleSortKeyChange(item.value)}>{item.label}</button>)}
      </div>
      <div className="catalog-sort__order">
        {listSortDirections.map((item) => <button key={item.label} className={item.class} aria-label={item.label} onClick={() => handleDirectionToggle(item.value)}></button>)}
      </div>
    </div>
  );
}

export default CatalogSort;
