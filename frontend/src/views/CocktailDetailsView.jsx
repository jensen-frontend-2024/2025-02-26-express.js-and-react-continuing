import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CocktailImage } from '../components/CocktailImage';

export function CocktailDetailsView() {
  const [cocktailDetails, setCocktailDetails] = useState(null);

  // This hooks takes all the path variables it can find in the URL and parses that to an object that we can use inside this component.
  const { id } = useParams(); // Will give as an objerct; {id: number}

  const fetchCocktailDetailsAsync = async (id) => {
    const response = await fetch(`http://localhost:3000/api/cocktails/${id}`);
    const data = await response.json();
    return data;
  };

  // Adding id in the dependency array makes sure that the useEffect runs again IF the id changes.
  useEffect(() => {
    fetchCocktailDetailsAsync(id).then((data) => setCocktailDetails(data));
  }, [id]);

  if (cocktailDetails === null) {
    return (
      <main className="cocktail-details-view">
        <div className="loader">Loading...</div>
      </main>
    );
  }

  return (
    <main className="cocktail-details-view">
      <h1>{cocktailDetails.name}</h1>
      <CocktailImage alt={cocktailDetails.name} src={cocktailDetails.thumbnail} />
      <div className="ingredients">
        {cocktailDetails.ingredients.map((ingredient) => (
          <div className="ingredient" key={ingredient.ingredient}>
            <span>{ingredient.ingredient}</span>
            <span>-</span>
            <span>{ingredient.measure}</span>
          </div>
        ))}
      </div>
      <p className="instructions">{cocktailDetails.instructions}</p>
    </main>
  );
}
