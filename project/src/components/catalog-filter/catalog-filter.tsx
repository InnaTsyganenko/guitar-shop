import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType, setSortDirection } from '../../store/guitars-data/guitars-data';
import { getSortType, getSortDirection } from '../../store/guitars-data/selectors';
import { ListSortTypes, ListSortDirections } from '../../const';
import { useState, PropsWithChildren, DetailedHTMLProps, InputHTMLAttributes, ChangeEvent, KeyboardEventHandler } from 'react';

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


  const GuitarTypesStringsMatch = [
    {
      type: 'acoustic',
      name: 'Акустические гитары',
      stringsNumber: [6, 7, 12],
    },
    {
      type: 'electric',
      name: 'Электрогитары',
      stringsNumber: [4, 6, 7],
    },
    {
      type: 'ukulele',
      name: 'Укулеле',
      stringsNumber: [4],
    },
  ];

  const strings = [4, 6, 7, 12];

  const [isTypeGuitarChecked, setIsTypeGuitarChecked] = useState<any>([]);
  const [isChecked, setChecked] = useState(false);

  const handleTypeGuitarChange = (evt: any) => {
    setChecked(!isChecked);

    if (!isChecked) {
      const arr = GuitarTypesStringsMatch.find((element) => element.type === evt.target.name);
      setIsTypeGuitarChecked(arr?.stringsNumber);
    } else {
      setIsTypeGuitarChecked([]);
    }
  };

  console.log(GuitarTypesStringsMatch[0].stringsNumber);
  console.log(isTypeGuitarChecked);
  console.log(isChecked);
  console.log();

  const [minValue, setMinValue] = useState(minPrice);
  // const [maxValue, setMaxValue] = useState(maxPrice);

  const handleFocus = (event: any) => event.target.select();


  const handleMinMaxInputChange = (event: any) => {
    if (event.target.id === 'priceMin') {
      setMinValue(event.target.value);
    }

    // if (event.target.id === 'priceMax') {
    //   setMaxValue(event.target.value);
    // }
  };

  const handleMinMaxPriceInputBlur = (event: any) => {
    if ((event.target.id === 'priceMin')&& (event.target.value < (minPrice as number) || event.target.value > (maxPrice as number))) {
      event.target.value = minPrice;
    }

    if ((event.target.id === 'priceMax') && (minValue && maxPrice) && (event.target.value < minValue || event.target.value > maxPrice)) {
      event.target.value = maxPrice;
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type='number'
              placeholder={minPrice?.toString()}
              id="priceMin"
              name="от"
              onFocus={handleFocus}
              onChange={handleMinMaxInputChange}
              onBlur={handleMinMaxPriceInputBlur}
              onKeyDown={(event) => (['+','-','e'].includes( event.key ) ? event.preventDefault() : null)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={maxPrice?.toString()}
              id="priceMax"
              name="до"
              onKeyDown={(event) => (['+','-','e'].includes( event.key ) ? event.preventDefault() : null)}
              onFocus={handleFocus}
              onChange={handleMinMaxInputChange}
              onBlur={handleMinMaxPriceInputBlur}
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {GuitarTypesStringsMatch.map((string) => (
          <div key={string.type} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={string.type}
              name={string.type}
              onChange={handleTypeGuitarChange}
            />
            <label htmlFor={string.type}>{string.name}</label>
          </div>))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {strings.map((string) => (
          <div key={string} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${string}-strings`}
              name={`${string}-strings`}
              disabled={isTypeGuitarChecked.length > 0 ? !isTypeGuitarChecked.includes(string) : false}
            />
            <label htmlFor={`${string}-strings`}>{string}</label>
          </div>))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
