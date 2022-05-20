import { EventType } from '@testing-library/react';
import { WaitForValueToChange } from '@testing-library/react-hooks';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCurrentPageCatalog } from '../../store/guitars-operations/selectors';
import { useApiGet, TApiResponse } from '../../hooks/use-api-get';
import { setSearchRequest } from '../../store/guitars-data/guitars-data';
import { fetchGuitarsBySearchAction } from '../../store/api-actions';
import { getSearchResults, getSearchRequest } from '../../store/guitars-data/selectors';

function HeaderSearch(): JSX.Element {
  const dispatch = useAppDispatch();

  const searchRequest = useAppSelector(getSearchRequest);

  const data: TApiResponse = useApiGet(searchRequest, fetchGuitarsBySearchAction);

  const searchGuitars = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase();
    dispatch(setSearchRequest(value));
  };

  const searchResults = useAppSelector(getSearchResults);
  console.log(data);
  console.log(searchRequest);
  console.log(searchResults);

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="../img/sprite_auto.svg#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищете?"
          onInput={searchGuitars}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={((searchResults !== undefined) && searchResults.length !== 0)
        ? 'form-search__select-list'
        : 'form-search__select-list hidden'}
      >
        {searchResults.map((item) => <li key={item.id} className="form-search__select-item" tabIndex={0}>{item.name}</li>)}
        <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
      </ul>
      <button className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="../img/sprite_auto.svg#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default HeaderSearch;
