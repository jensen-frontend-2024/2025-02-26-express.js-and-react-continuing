import { createBrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { StartView } from './views/StartView';
import { RandomCocktailView } from './views/RandomCocktailView';
import { CocktailDetailsView } from './views/CocktailDetailsView';
import { SearchView } from './views/SearchView';

// Every time the URL in the broswer changes, the RouterProvider will try and match that URL agains something in this router object. When it gets a match, it will render the corresponding component defined on the element attribute.
export const router = createBrowserRouter([
  {
    // In order for children routes to be matched, both the parent path and the children path must match together with the URL in the browser.
    children: [
      { element: <StartView />, index: true },
      {
        element: <RandomCocktailView />,
        path: 'random-cocktail',
      },
      {
        element: <CocktailDetailsView />,
        path: 'details/:id', // :id is dynamic path variable/parameter that we can use later inside our component
      },
      {
        element: <SearchView />,
        path: '/search',
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
    path: '*', // The asterix string matches everything, so see this as a fallback route.
  },
]);
