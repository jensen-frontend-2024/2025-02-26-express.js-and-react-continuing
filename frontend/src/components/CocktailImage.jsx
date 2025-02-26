/* eslint-disable react/prop-types */

export function CocktailImage({ alt, src }) {
  return (
    <figure className="cocktail-image">
      <img src={src} alt={alt} />
    </figure>
  );
}
