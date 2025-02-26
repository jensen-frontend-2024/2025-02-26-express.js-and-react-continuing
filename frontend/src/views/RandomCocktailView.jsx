import { useEffect, useState } from 'react';
import { RandomCocktail } from '../components/RandomCocktail';

export function RandomCocktailView() {
  const [randomCocktail, setRandomCocktail] = useState(null);

  const fetchRandomCocktailAsync = async () => {
    const response = await fetch('http://localhost:3000/api/cocktails/random');
    const randomCocktail = await response.json();
    return randomCocktail;
  };

  // Empty dependency array makes this useEffect run on first render only.
  useEffect(() => {
    fetchRandomCocktailAsync().then((data) => setRandomCocktail(data));
  }, []);

  // Early return if randomCocktail is null
  if (randomCocktail === null) {
    return (
      <main className="random-cocktail-view">
        <div className="loader"></div>
      </main>
    );
  }

  return (
    <main className="random-cocktail-view">
      <RandomCocktail cocktail={randomCocktail} />
    </main>
  );
}
