import IRoute from '../interfaces/route';
import FavoritePage from '../pages/favorite/Favorite';
import HomePage from '../pages/home/Home';

const routes: IRoute[] = [
  {
    path: '/joke_generator',
    name: 'Home Page',
    component: HomePage,
    exact: true,
  },
  {
    path: '/joke_generator/favorites',
    name: 'Favorite Page',
    component: FavoritePage,
    exact: true,
  },
];

export default routes;
