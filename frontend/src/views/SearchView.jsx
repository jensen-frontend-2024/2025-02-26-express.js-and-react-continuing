import { useRef, useState } from 'react';

export function SearchView() {
  // const [searchValue, setSearchValue] = useState('vodka');
  const inputRef = useRef(null);

  // const handleOnChange = (e) => {
  //   setSearchValue(e.target.value);
  // };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    fetchCocktailsBySearchStr(searchValue);
  };

  const fetchCocktailsBySearchStr = async (searchStr) => {
    const path = `http://localhost:3000/api/cocktails?s=${searchStr}`;
    const response = await fetch(path);
    const cocktails = await response.json();
    console.log(cocktails);
  };

  return (
    <main className="search-view">
      <form className="form" onSubmit={handleOnSubmit}>
        {/* For uncontrolled component, use useRef */}
        <input ref={inputRef} type="text" />

        {/* For controlled component, use useState variable together with onChange */}
        {/* <input onChange={handleOnChange} type="text" value={searchValue} /> */}

        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
    </main>
  );
}
