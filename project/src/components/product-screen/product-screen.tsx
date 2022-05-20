import Wrapper from '../wrapper/wrapper';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Rating from '../rating/rating';
import ProductReviews from '../product-reviews/product-reviews';
import Footer from '../footer/footer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getPickedId } from '../../store/guitars-operations/selectors';
import { useState, useEffect } from 'react';
import { fetchGuitarByIdAction } from '../../store/api-actions';
import { getGuitarById, getStatusLoadedGuitar } from '../../store/guitars-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { APIRoute, CardGuitarTabs, GuitarType } from '../../const';
import { useApiGet, TApiResponse } from '../../hooks/use-api-get';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>(Object.keys(CardGuitarTabs)[0]);

  const pickedId = useAppSelector(getPickedId);

  const data: TApiResponse = useApiGet(pickedId, fetchGuitarByIdAction);

  const guitar = useAppSelector(getGuitarById);
  const isGuitarLoaded = useAppSelector(getStatusLoadedGuitar);

  const handleCardGuitarTabs = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: string) => {
    evt.preventDefault();
    setActiveTab(key);
  };

  if (!isGuitarLoaded) {
    return <LoadingScreen text={'Loading failed.'} />;
  } else if (!data.loading) {
    return <LoadingScreen text={'Loading...'} />;
  } else {
    return (
      <Wrapper>
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">{guitar.name}</h1>
            <Breadcrumbs guitarId={pickedId} guitarName={guitar.name} />
            <div className="product-container">
              <img className="product-container__img" src={`/${guitar.previewImg}`} width="220" height="252" alt={`Фото гитары ${guitar.name}`} />
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
                <div className="rate product-container__rating">
                  <Rating
                    rating={guitar.rating}
                    commentsLength={guitar.comments.length}
                    isRatingWithCountReviews
                  />
                </div>
                <div className="tabs">
                  {Object.entries(CardGuitarTabs).map(([key, value]) => (
                    <a key={key}
                      onClick={(evt) => handleCardGuitarTabs(evt, key)}
                      className={activeTab === key ?
                        'button button--medium tabs__button'
                        : 'button button--black-border button--medium tabs__button'}
                      href="#characteristics"
                    >{value}
                    </a>
                  ))}
                  <div className="tabs__content" id="characteristics">
                    <table className={Object.keys(CardGuitarTabs)[0] === activeTab
                      ? 'tabs__table'
                      : 'tabs__table hidden'}
                    >
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{guitar.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{GuitarType[guitar.type as keyof object]}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{guitar.stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className={Object.keys(CardGuitarTabs)[1] === activeTab
                      ? 'tabs__product-description'
                      : 'tabs__product-description hidden'}
                    >{guitar.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p><a className="button button--red button--big product-container__button" href="##" onClick={(evt) => evt.preventDefault()}>Добавить в корзину</a>
              </div>
            </div>
            <ProductReviews currentGuitar={guitar} reviews={guitar.comments} />
          </div>
        </main>
        <Footer />
      </Wrapper>
    );
  }
}

export default ProductScreen;
