/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterMinPrice, setFilterMaxPrice, setFilterGuitarType, setFilterStringCount, resetFilters } from '../../store/guitars-data/guitars-data';
import { getGuitarsMinPrice, getGuitarsMaxPrice, getFilterMinPrice, getFilterMaxPrice} from '../../store/guitars-data/selectors';
import { useEffect, useState } from 'react';
import { removeMatchItemsFromArray  } from '../../utils/utils';
import { GuitarTypesStringsMatch, GuitarPrices, SymbolsBanForInput } from '../../const';
import { useSearchParams } from 'react-router-dom';


function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const strings = [...new Set(GuitarTypesStringsMatch.map((item) => item.stringsNumber).sort().flat())];

  const guitarsMinPrice = useAppSelector(getGuitarsMinPrice);
  const guitarsMaxPrice = useAppSelector(getGuitarsMaxPrice);

  const filterMinPrice = useAppSelector(getFilterMinPrice);
  const filterMaxPrice = useAppSelector(getFilterMaxPrice);

  const [stringsAvailableByType, setStringsAvailableByType] = useState<any>([]);
  const [typeChecked, setTypeChecked] = useState<any>({
    acoustic: false,
    electric: false,
    ukulele: false,
  });

  const [stringChecked, setStringChecked] = useState<any>([]);
  const [stringEnabled, setStringEnabled] = useState<any>({
    4: false,
    6: false,
    7: false,
    12: false,
  });

  const [minPrice, setMinPrice] = useState<any | number>();
  const [maxPrice, setMaxPrice] = useState<any | number>();
  const [minValue, setMinValue] = useState(guitarsMinPrice);

  const processTypeUrlData = (value: any) => {
    typeChecked[value] = !typeChecked[value];
    setTypeChecked({...typeChecked});

    const firstStringArray: any = GuitarTypesStringsMatch.find((element) => element.type === value)?.stringsNumber;

    let availableStringArray;

    if (typeChecked[value]) {
      availableStringArray = [...stringsAvailableByType , ...firstStringArray];
      setStringsAvailableByType(availableStringArray);
    } else {
      availableStringArray = removeMatchItemsFromArray(stringsAvailableByType, firstStringArray);
      setStringsAvailableByType(availableStringArray);
    }

    const checkedTypesArray = Object.keys(typeChecked).filter((id) => typeChecked[id]);
    dispatch(setFilterGuitarType(checkedTypesArray));
  };

  const processStringsUrlData = (value: any) => {
    stringEnabled[value] = !stringEnabled[value];
    setStringEnabled({...stringEnabled});

    let enabledStringArray;

    if (stringEnabled[value]) {
      enabledStringArray = [...new Set(stringChecked), value];
      setStringChecked(enabledStringArray);
    } else {
      const index = stringChecked.indexOf(value);
      if (index > -1) {stringChecked.splice(index, 1);}
      setStringChecked(stringChecked);
    }

    const checkedStringArray = Object.keys(stringEnabled).filter((id) => stringEnabled[id]);
    dispatch(setFilterStringCount(checkedStringArray));
  };

  const handleTypeChange = (evt: any) => {
    processTypeUrlData(evt.target.name);
  };

  const handleStringChange = (string: any) => {
    processStringsUrlData(string);
  };

  const handleInputPriceFocus = (evt: any) => evt.target.select();

  const handleInputPriceChange = ({target:{id, value}}: any) => {
    if (id === GuitarPrices[0].id) {
      setMinPrice(value);
      if ((value >= guitarsMinPrice) && (value <= guitarsMaxPrice)) {
        setMinValue(value);
      } else {
        setMinValue(guitarsMinPrice);
      }
    }

    if (id === GuitarPrices[1].id) {
      setMaxPrice(value);
    }
  };

  const handlePriceKeyUp = (evt: any) => {
    if (SymbolsBanForInput.includes(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleInputPriceInput = (evt: any) => {
    if (SymbolsBanForInput.includes(evt.key)) {
      evt.preventDefault();
    }

    if ((evt.key === 'Enter') || (evt.type === 'blur')) {
      const target = evt.target;
      const value = Number(target.value);
      const id = (target.id).toString();

      if (id === GuitarPrices[0].id) {
        if ((value < guitarsMinPrice) || (value >= guitarsMaxPrice)) {
          setMinPrice(guitarsMinPrice);
          dispatch(setFilterMinPrice(guitarsMinPrice));
        } else if ((value >= guitarsMinPrice) && (value <= guitarsMaxPrice)) {
          setMinPrice(value);
          dispatch(setFilterMinPrice(Number(minPrice)));
        }

      }

      if (id === GuitarPrices[1].id) {
        if ((value < Number(minValue)) || (value >= guitarsMaxPrice)) {
          setMaxPrice(guitarsMaxPrice);
          dispatch(setFilterMaxPrice(guitarsMaxPrice));
          console.log((value >= Number(minValue)) && (value <= guitarsMaxPrice));
        } else if ((value >= Number(minValue)) && (value <= guitarsMaxPrice)) {
          setMaxPrice(value);
          dispatch(setFilterMaxPrice(Number(maxPrice)));
        }
      }
    }
  };

  const handleInputPricePaste = (evt: any) => {
    const paste: string = (evt.clipboardData).getData('text');
    const newPaste = Array.from(paste).filter((item) => !SymbolsBanForInput.includes(item));
    evt.target.value = newPaste.map((item) => item).join('');
    evt.preventDefault();
  };

  const handleResetButtonClick = () => {
    setTypeChecked([]);
    setStringChecked([]);
    setStringEnabled([]);
    setStringsAvailableByType([]);
    dispatch(resetFilters());
  };


  const offCheckedDisableInput = () => document.getElementById('catalog-filter')?.querySelectorAll(('input[disabled]')).forEach((item: any) => item.checked = false);

  offCheckedDisableInput();

  useEffect(() => {
    if (filterMinPrice === 0 && filterMaxPrice === 0) {
      setMinPrice('');
      setMaxPrice('');
    }
  }, [filterMinPrice, filterMaxPrice]);

  useEffect(() => {
    console.log(searchParams);
    const searchParamsTypes = searchParams.getAll('type');
    searchParamsTypes.forEach((item) => processTypeUrlData(item));

    const searchParamsStrings = searchParams.getAll('string_qt');
    searchParamsStrings.forEach((item) => processStringsUrlData(Number(item)));

    const searchParamsMinPrice = searchParams.get('price_gte');
    setMinPrice(searchParamsMinPrice);

    const searchParamsMaxPrice = searchParams.get('price_lte');
    setMaxPrice(searchParamsMaxPrice);

  }, []);

  return (
    <form className="catalog-filter" id="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type='number'
              placeholder={guitarsMinPrice?.toString()}
              id='priceMin'
              name='от'
              onFocus={handleInputPriceFocus}
              onChange={handleInputPriceChange}
              onBlur={handleInputPriceInput}
              onKeyDown={handleInputPriceInput}
              onKeyUp={handlePriceKeyUp}
              onPaste={handleInputPricePaste}
              min={guitarsMinPrice}
              max={guitarsMaxPrice}
              value={minPrice}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type='number'
              placeholder={guitarsMaxPrice?.toString()}
              id='priceMax'
              name='до'
              onFocus={handleInputPriceFocus}
              onChange={handleInputPriceChange}
              onBlur={handleInputPriceInput}
              onKeyDown={handleInputPriceInput}
              onKeyUp={handlePriceKeyUp}
              onPaste={handleInputPricePaste}
              min={guitarsMinPrice}
              max={guitarsMaxPrice}
              value={maxPrice}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {GuitarTypesStringsMatch.map((item) => (
          <div key={item.type} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={item.type}
              name={item.type}
              onChange={handleTypeChange}
              disabled={!typeChecked[item.type] && (stringChecked.length > 0) && item.stringsNumber.every((el) => !stringChecked.includes(el))}
              checked={typeChecked[item.type]}
            />
            <label htmlFor={item.type}>{item.name}</label>
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
              onChange={() => handleStringChange(string)}
              disabled={!stringEnabled[string] && (stringsAvailableByType.length > 0) ? !stringsAvailableByType.includes(string) : false}
              checked={stringEnabled[string]}
            />
            <label htmlFor={`${string}-strings`}>{string}</label>
          </div>))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleResetButtonClick}>Очистить</button>
    </form>
  );
}

export default CatalogFilter;
