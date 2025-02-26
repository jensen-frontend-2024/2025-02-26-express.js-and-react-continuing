/* eslint-disable react/prop-types */

import { NavLink } from 'react-router-dom';
import { CocktailImage } from './CocktailImage';

export function RandomCocktail({ cocktail }) {
  return (
    <article className="random-cocktail">
      <CocktailImage alt={cocktail.name} src={cocktail.thumbnail} />
      <div className="content">
        <h2>{cocktail.name}</h2>
        <NavLink to={`/details/${cocktail.id}`}>
          <button className="btn details">View details</button>
        </NavLink>
      </div>
    </article>
  );
}
