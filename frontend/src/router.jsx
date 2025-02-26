import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './components/App';
import { StartView } from './views/StartView';
import { RandomCocktailView } from './views/RandomCocktailView';
import { CocktailDetailsView } from './views/CocktailDetailsView';
import { SearchView } from './views/SearchView';

// Router config created with JSX syntax instead of object syntax. Much cleaner!
export const routerJSX = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route element={<StartView />} index />
      <Route element={<RandomCocktailView />} path="random-cocktail" />
      <Route element={<CocktailDetailsView />} path="details/:id" />
      <Route element={<SearchView />} path="search" />
      <Route
        element={
          <section>
            <h1>404 Page. The URL does not have any matches</h1>
          </section>
        }
        path="*"
      />
    </Route>
  )
);

export const router = createBrowserRouter([
  {
    children: [
      { element: <StartView />, index: true },
      {
        element: <RandomCocktailView />,
        path: 'random-cocktail',
      },
      {
        element: <CocktailDetailsView />,
        path: 'details/:id',
      },
      {
        element: <SearchView />,
        path: 'search',
      },
    ],
    element: <App />,
    path: '/',
  },
  {
    element: (
      <section>
        <h1>404 Page. The URL does not have any matches</h1>
      </section>
    ),
    path: '*',
  },
]);
