/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterMinPrice, setFilterMaxPrice, setFilterGuitarType, setFilterStringCount, resetFilters } from '../../store/guitars-data/guitars-data';
import { getGuitarsMinPrice, getGuitarsMaxPrice} from '../../store/guitars-data/selectors';
import { useState } from 'react';
import { removeMatchItemsFromArray  } from '../../utils/utils';
import { GuitarTypesStringsMatch, GuitarPrices, SymbolsBanForInput } from '../../const';


function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const strings = [...new Set(GuitarTypesStringsMatch.map((item: any) => item.stringsNumber).sort().flat())];

  const guitarsMinPrice = useAppSelector(getGuitarsMinPrice);
  const guitarsMaxPrice = useAppSelector(getGuitarsMaxPrice);

  const [isTypeGuitarChecked, setIsTypeGuitarChecked] = useState<any>([]);
  const [isTypeEnabled, setTypeEnabled] = useState<any>({
    acoustic: false,
    electric: false,
    ukulele: false,
  });

  const [isStringChecked, setStringChecked] = useState<any>([]);
  const [isStringEnabled, setStringEnabled] = useState<any>({
    4: false,
    6: false,
    7: false,
    12: false,
  });

  const handleTypeGuitarChange = (evt: any) => {
    isTypeEnabled[evt.target.name] = !isTypeEnabled[evt.target.name];
    setTypeEnabled({...isTypeEnabled});

    const firstStringArray: any = GuitarTypesStringsMatch.find((element) => element.type === evt.target.name)?.stringsNumber;

    let availableStringArray;

    if (isTypeEnabled[evt.target.name]) {
      availableStringArray = [...isTypeGuitarChecked , ...firstStringArray];
      setIsTypeGuitarChecked(availableStringArray);
    } else {
      availableStringArray = removeMatchItemsFromArray(isTypeGuitarChecked, firstStringArray);
      setIsTypeGuitarChecked(availableStringArray);
    }

    const checkedTypesArray = Object.keys(isTypeEnabled).filter((id) => isTypeEnabled[id]);
    dispatch(setFilterGuitarType(checkedTypesArray));
  };


  const [minValue, setMinValue] = useState(guitarsMinPrice);

  const handleInputPriceFocus = (evt: any) => evt.target.select();

  const handleMinMaxPriceInputChange = (evt: any) => {
    if (evt.target.id === GuitarPrices[0].id) {
      if ((evt.target.value > guitarsMinPrice) && (evt.target.value < guitarsMaxPrice)) {
        setMinValue(evt.target.value);
      }
    }
  };

  const handleMinMaxPriceInputBlur = (evt: any) => {
    const target = evt.target;
    const value = Number(target.value);
    const id = (target.id).toString();

    if (id === GuitarPrices[0].id) {
      if ((value <= guitarsMinPrice) || (value >= guitarsMaxPrice)) {
        evt.target.value = guitarsMinPrice;
      }
      dispatch(setFilterMinPrice(evt.target.value));
    }

    if (id === GuitarPrices[1].id) {
      if ((value <= Number(minValue)) || (value >= guitarsMaxPrice)) {
        evt.target.value = guitarsMaxPrice;
      }
      dispatch(setFilterMaxPrice(evt.target.value));
    }
  };

  const handleResetButtonClick = () => {
    setIsTypeGuitarChecked([]);
    dispatch(resetFilters());
  };

  const handleStringInputChange = (string: any) => {
    isStringEnabled[string] = !isStringEnabled[string];
    setStringEnabled({...isStringEnabled});

    let enabledStringArray;

    if (isStringEnabled[string]) {
      enabledStringArray = [...new Set(isStringChecked), string];
      setStringChecked(enabledStringArray);
    } else {
      const index = isStringChecked.indexOf(string);
      if (index > -1) {isStringChecked.splice(index, 1);}
      setStringChecked(isStringChecked);
    }

    const checkedStringArray = Object.keys(isStringEnabled).filter((id) => isStringEnabled[id]);
    dispatch(setFilterStringCount(checkedStringArray));
  };

  const handleInputPricePaste = (evt: any) => {
    const paste: string = (evt.clipboardData).getData('text');
    const newPaste = Array.from(paste).filter((item) => !SymbolsBanForInput.includes(item));
    evt.target.value = newPaste.map((item) => item).join('');
    evt.preventDefault();
  };


  const offCheckedDisableInput = () => document.getElementById('catalog-filter')?.querySelectorAll(('input[disabled]')).forEach((item: any) => item.checked = false);

  offCheckedDisableInput();

  return (
    <form className="catalog-filter" id="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          {GuitarPrices.map((item) => (
            <div key={item.id} className="form-input">
              <label className="visually-hidden">{item.label}</label>
              <input
                type='number'
                placeholder={item.id === GuitarPrices[0].id ? guitarsMinPrice?.toString() : guitarsMaxPrice?.toString()}
                id={item.id}
                name={item.name}
                onFocus={handleInputPriceFocus}
                onChange={handleMinMaxPriceInputChange}
                onBlur={handleMinMaxPriceInputBlur}
                onKeyDown={(evt) => (SymbolsBanForInput.includes(evt.key) ? evt.preventDefault() : null)}
                onKeyUp={(evt) => (SymbolsBanForInput.includes(evt.key) ? evt.preventDefault() : null)}
                onPaste={handleInputPricePaste}
                min={guitarsMinPrice}
                max={guitarsMaxPrice}
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
              disabled={isStringChecked.length !== 0 && GuitarTypesStringsMatch.find((element) => element.type === string.type)?.stringsNumber.every((element) => !(isStringChecked.includes(element)))}
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
              onClick={() => handleStringInputChange(string)}
            />
            <label htmlFor={`${string}-strings`}>{string}</label>
          </div>))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleResetButtonClick}>Очистить</button>
    </form>
  );
}

export default CatalogFilter;
