/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterMinPrice, setFilterMaxPrice, setFilterGuitarType, setFilterStringCount, resetFilters } from '../../store/guitars-data/guitars-data';
import { getGuitarsMinPrice, getGuitarsMaxPrice} from '../../store/guitars-data/selectors';
import { HTMLInputTypeAttribute, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { removeMatchItemsFromArray  } from '../../utils/utils';
import { GuitarTypesStringsMatch, GuitarPrices, SymbolsBanForInput } from '../../const';
import { useHref, useSearchParams } from 'react-router-dom';


function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  // console.log(`searchParams.toString(): ${searchParams.toString()}`)

  const strings = [...new Set(GuitarTypesStringsMatch.map((item) => item.stringsNumber).sort().flat())];

  const guitarsMinPrice = useAppSelector(getGuitarsMinPrice);
  const guitarsMaxPrice = useAppSelector(getGuitarsMaxPrice);


  const mytext = useRef<HTMLInputElement | null>(null);
  const priceMinRef = useRef() as React.MutableRefObject<HTMLInputElement | number | any | null>;
  const priceMaxRef = useRef() as React.MutableRefObject<HTMLInputElement | number | any | null>;



  const [typeGuitarChecked, setIsTypeGuitarChecked] = useState<any>([]);
  const [typeEnabled, setTypeEnabled] = useState<any>({
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

  const handleTypeGuitarChange = (evt: any) => {
    typeEnabled[evt.target.name] = !typeEnabled[evt.target.name];
    setTypeEnabled({...typeEnabled});

    const firstStringArray: any = GuitarTypesStringsMatch.find((element) => element.type === evt.target.name)?.stringsNumber;

    let availableStringArray;

    if (typeEnabled[evt.target.name]) {
      availableStringArray = [...typeGuitarChecked , ...firstStringArray];
      setIsTypeGuitarChecked(availableStringArray);
    } else {
      availableStringArray = removeMatchItemsFromArray(typeGuitarChecked, firstStringArray);
      setIsTypeGuitarChecked(availableStringArray);
    }

    const checkedTypesArray = Object.keys(typeEnabled).filter((id) => typeEnabled[id]);
    dispatch(setFilterGuitarType(checkedTypesArray));
  };


  const [minValue, setMinValue] = useState(guitarsMinPrice);

  const handleInputPriceFocus = (evt: any) => evt.target.select();

  const handleMinMaxPriceInputChange = ({target:{id, value}}: any) => {
    const prevValue = value;
    if (id === GuitarPrices[0].id) {
      priceMinRef.current = prevValue.concat(Number(value));
      console.log(`priceMinRef.current:  ${priceMinRef.current}`);
      if ((value > guitarsMinPrice) && (value < guitarsMaxPrice)) {
        setMinValue(value);
      }
    }
  };

  // const handlePriceKeyUp = (evt: any) => {
  //   if (SymbolsBanForInput.includes(evt.key)) {
  //     evt.preventDefault();
  //   }

  //   const target = evt.target;
  //   const id = (target.id).toString();



  //   if (id === GuitarPrices[0].id) {
  //     priceMinRef.current = evt.target.value;
  //     console.log(priceMinRef.current);
  //   }

  //   if (id === GuitarPrices[1].id) {
  //     priceMaxRef.current = evt.target.value;
  //   }
  // };

  const handleMinMaxPriceInput = (evt: any) => {
    if (SymbolsBanForInput.includes(evt.key)) {
      evt.preventDefault();
    }

    if ((evt.key === 'Enter') || (evt.type === 'blur')) {
      const target = evt.target;
      const value = Number(target.value);
      const id = (target.id).toString();

      // console.log(`priceRef: ${priceRef}`);

      if (id === GuitarPrices[0].id) {
        if ((value <= guitarsMinPrice) || (value >= guitarsMaxPrice)) {
          // priceMinRef.current = guitarsMinPrice;
        }
        dispatch(setFilterMinPrice(Number(evt.target.value)));
      }

      if (id === GuitarPrices[1].id) {
        if ((value <= Number(minValue)) || (value >= guitarsMaxPrice)) {
          evt.target.value = guitarsMaxPrice;
        }
        dispatch(setFilterMaxPrice(Number(evt.target.value)));
      }
    }
  };

  const handleResetButtonClick = () => {
    setIsTypeGuitarChecked([]);
    dispatch(resetFilters());
    // priceMinRef.current = guitarsMinPrice;
  };

  const handleStringInputChange = (string: any) => {
    stringEnabled[string] = !stringEnabled[string];
    setStringEnabled({...stringEnabled});

    let enabledStringArray;

    if (stringEnabled[string]) {
      enabledStringArray = [...new Set(stringChecked), string];
      setStringChecked(enabledStringArray);
    } else {
      const index = stringChecked.indexOf(string);
      if (index > -1) {stringChecked.splice(index, 1);}
      setStringChecked(stringChecked);
    }

    const checkedStringArray = Object.keys(stringEnabled).filter((id) => stringEnabled[id]);
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



  function test() {
    const element = document.getElementById("ddddd");


    console.log(`mytext.current?.value: ${mytext.current?.value}`);
  }

  // test();

  useLayoutEffect(() => {
    //object can be null
    // if (priceRef.current) {
    //   console.log(priceRef.current?.value);
    // }
  });

  // const getPriceRef = (element: any) => {
  //   console.log(element?.id);
  //   console.log(element?.value);
  //   console.log(priceMinRef.current);
  //   const value = priceMinRef.current;
  //   if (element?.id === GuitarPrices[0].id) {
  //     const newValue = '5000';
  //     priceMinRef.current = element?.value;
  //     // if ((value > guitarsMinPrice) && (value < guitarsMaxPrice)) {
  //     //   setMinValue(value);
  //     // }
  //   }
  // };


  const inputElement = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(priceMinRef, () => {
    return {
      value: inputElement.current ? inputElement.current.value : '',
      setValue: (value: string) => {
        inputElement.current && (inputElement.current.value = value);
      },
    };
  });

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
              onChange={handleMinMaxPriceInputChange}
              onBlur={handleMinMaxPriceInput}
              onKeyDown={handleMinMaxPriceInput}
              // onKeyUp={handlePriceKeyUp}
              onPaste={handleInputPricePaste}
              min={guitarsMinPrice}
              max={guitarsMaxPrice}
              ref={priceMinRef}
              value={Number(priceMinRef.current)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type='number'
              placeholder={guitarsMinPrice?.toString()}
              id='priceMax'
              name='до'
              onFocus={handleInputPriceFocus}
              onChange={handleMinMaxPriceInputChange}
              onBlur={handleMinMaxPriceInput}
              onKeyDown={handleMinMaxPriceInput}
              // onKeyUp={handlePriceKeyUp}
              onPaste={handleInputPricePaste}
              min={guitarsMinPrice}
              max={guitarsMaxPrice}
              ref={priceMaxRef}
              value={Number(priceMaxRef.current)}
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
              disabled={stringChecked.length !== 0 && GuitarTypesStringsMatch.find((element) => element.type === string.type)?.stringsNumber.every((element) => !(stringChecked.includes(element)))}
              ref={mytext}
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
              disabled={typeGuitarChecked.length > 0 ? !typeGuitarChecked.includes(string) : false}
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
