import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType, setSortDirection } from '../../store/guitars-data/guitars-data';
import { getSortType, getSortDirection } from '../../store/guitars-data/selectors';
import { ListSortTypes, ListSortDirections } from '../../const';
import { useState, PropsWithChildren, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type CatalogFilterProps = PropsWithChildren<{
  minPrice?: number;
  maxPrice?: number;
}>;

function CatalogFilter({minPrice, maxPrice}: CatalogFilterProps): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedSortType = useAppSelector(getSortType);

  // const handleSortKeyChange = (sortType: string) => {
  //   if (selectedSortDirection === '') {
  //     dispatch(setSortDirection('asc'));
  //   }
  //   dispatch(setSortType(sortType));
  // };


  const [value, setValue] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const handleChange = (event: any) => {
    const newMinValue = Math.max(minPrice as number, Math.min(maxPrice as number, Number(event.target.value)));
    setValue({
      ...value,
      min: newMinValue,
    });
  };

  console.log(value);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={minPrice?.toString()} id="priceMin" name="от" value={value.min} onChange={handleChange} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={maxPrice?.toString()} id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
