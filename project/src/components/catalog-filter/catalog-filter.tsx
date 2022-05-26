/* eslint-disable prefer-arrow-callback */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterMinPrice, setFilterMaxPrice, setFilterGuitarType, setFilterStringCount } from '../../store/guitars-data/guitars-data';
import { getFilterMinPrice,
  getFilterMaxPrice,
  getFilterStringCount,
  getFilterGuitarType } from '../../store/guitars-data/selectors';
import { ListSortTypes, ListSortDirections } from '../../const';
import { useState, PropsWithChildren, DetailedHTMLProps, InputHTMLAttributes, ChangeEvent, KeyboardEventHandler } from 'react';

type CatalogFilterProps = PropsWithChildren<{
  minPrice?: number;
  maxPrice?: number;
}>;

function CatalogFilter({minPrice, maxPrice}: CatalogFilterProps): JSX.Element {
  const dispatch = useAppDispatch();

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

  const GuitarPrices = [
    {
      id: 'priceMin',
      label: 'Минимальная цена',
      name: 'от',
    },
    {
      id: 'priceMax',
      label: 'Максимальная цена',
      name: 'до',
    },
  ];

  const strings = [4, 6, 7, 12];

  const selectedFilterMinPrice = useAppSelector(getFilterMinPrice);
  const selectedFilterMaxPrice = useAppSelector(getFilterMaxPrice);
  const selectedFilterGuitarType = useAppSelector(getFilterGuitarType);
  const selectedFilterStringCount = useAppSelector(getFilterStringCount);

  const [isTypeGuitarChecked, setIsTypeGuitarChecked] = useState<any>([]);
  const [isChecked, setChecked] = useState<any>({
    acoustic: false,
    electric: false,
    ukulele: false,
  });

  const removeMatchItemsFromArray = (arrayOne: any, arrayTwo: any): Array<any> => {
    arrayTwo.forEach((i: any) => {
      const index = arrayOne.lastIndexOf(i);
      if (index > -1) {
        arrayOne.splice(index, 1);
      }
    });

    return arrayOne;
  };

  const SymbolsBanForInput = ['+','-','e'];

  const handleTypeGuitarChange = (evt: any) => {
    isChecked[evt.target.name] = !isChecked[evt.target.name];
    setChecked({...isChecked});

    const arr: any = GuitarTypesStringsMatch.find((element) => element.type === evt.target.name)?.stringsNumber;

    if (isChecked[evt.target.name]) {
      const myFinalArray = [...isTypeGuitarChecked ,...arr];
      setIsTypeGuitarChecked(myFinalArray);
    } else {
      const myFinalArray = removeMatchItemsFromArray(isTypeGuitarChecked, arr);
      setIsTypeGuitarChecked(myFinalArray);
    }
  };


  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const handleInputPriceFocus = (event: any) => event.target.select();

  const handleMinMaxPriceInputChange = (event: any) => {
    if (event.target.id === GuitarPrices[0].id) {
      setMinValue(event.target.value);
    }

    if (event.target.id === GuitarPrices[1].id) {
      setMaxValue(event.target.value);
    }
  };

  const handleMinMaxPriceInputBlur = (event: any) => {
    if (event.target.id === GuitarPrices[0].id) {
      if (event.target.value < (minPrice as number) || event.target.value > (maxPrice as number)) {
        event.target.value = minPrice;
      }

      dispatch(setFilterMinPrice(event.target.value));
    }

    if (event.target.id === GuitarPrices[1].id) {
      if (event.target.value < (minValue as number) || event.target.value > (maxPrice as number)) {
        event.target.value = maxPrice;
      }

      dispatch(setFilterMaxPrice(event.target.value));
    }
  };
  console.log(selectedFilterMinPrice);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          {GuitarPrices.map((item) => (
            <div key={item.id} className="form-input">
              <label className="visually-hidden">{item.label}</label>
              <input
                type='number'
                placeholder={item.id === GuitarPrices[0].id ? minPrice?.toString() : maxPrice?.toString()}
                value={item.id === GuitarPrices[0].id ? minValue : maxValue}
                id={item.id}
                name={item.name}
                onFocus={handleInputPriceFocus}
                onChange={handleMinMaxPriceInputChange}
                onBlur={handleMinMaxPriceInputBlur}
                onKeyDown={(event) => (SymbolsBanForInput.includes( event.key ) ? event.preventDefault() : null)}
                min={minPrice}
                max={maxPrice}
              />
            </div>
          ))}
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
