import { useRef } from 'react';

export function SearchView() {
  const inputRef = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    fetchCocktailsBySearchStr(searchValue);
  };

  const fetchCocktailsBySearchStr = async (searchStr) => {
    const path = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchStr}`;
    const response = await fetch(path);
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="search-view">
      <form className="form" onSubmit={handleOnSubmit}>
        <input ref={inputRef} type="text" />
        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
    </main>
  );
}
