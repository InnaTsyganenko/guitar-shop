import { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { resetSearch } from '../../store/guitars-data/guitars-data';
import { getSearchResults } from '../../store/guitars-data/selectors';
import { setGuitarId } from '../../store/guitars-operations/guitars-operations';
import { useNavigate } from 'react-router-dom';
import { fetchGuitarsBySearchAction } from '../../store/api-actions';

function HeaderSearch(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchSearchGuitars = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase();
    if (value === '') {
      dispatch(resetSearch());
      return;
    }
    await dispatch(fetchGuitarsBySearchAction(value));
  }, [dispatch]);

  const searchResults = useAppSelector(getSearchResults);

  const handleSearchResultClick = (id: number) => {
    dispatch(resetSearch());
    dispatch(setGuitarId(id));
    navigate(`${AppRoute.Guitars}${id}`);
  };

  const handleKeyDown = (evt: KeyboardEvent, id: number) => {
    if (evt.key === 'Enter') {
      handleSearchResultClick(id);
    }
  };

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
          onChange={fetchSearchGuitars}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={((searchResults !== undefined) && searchResults.length !== 0)
        ? 'list-opened form-search__select-list'
        : 'form-search__select-list hidden'}
      >
        {(searchResults !== undefined || searchResults === null) && searchResults.map((item) => (
          <li
            key={item.id}
            className="form-search__select-item"
            tabIndex={0}
            onClick={() => handleSearchResultClick(item.id)}
            onKeyDown={(evt) => handleKeyDown(evt, item.id)}
          >{item.name}
          </li>))}
      </ul>
      <button className="form-search__reset" type="reset" form="form-search" onClick={() => dispatch(resetSearch())}>
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="../img/sprite_auto.svg#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default HeaderSearch;
