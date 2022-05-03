import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function MainScreen(): JSX.Element {
  return (
    <main className="container main-index"><img src="img/svg/logo.svg" width="300" alt="Логотип проекта" style={{background:"black"}}/>
      <h1>Список страниц</h1>
      <ol>
        <li><Link className="link" to={AppRoute.Catalog}>Каталог</Link></li>
        <li><Link className="link" to={AppRoute.Cart}>Корзина</Link></li>
      </ol>
    </main>
  );
}

export default MainScreen;
