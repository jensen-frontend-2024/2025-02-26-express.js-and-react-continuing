import express from 'express';
import Database from 'better-sqlite3';
import fetch from 'node-fetch';
import cors from 'cors';
import { mapRawCocktailData } from './utilities.js';

const db = new Database('../cocktails.db');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  console.log('FORWARDSLASH/');

  res.send('Nothing here folks');
});

app.get('/api/cocktails/random', async (req, res) => {
  console.log('COCKTAILS/RANDOM');

  const path = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(path);
  const rawCocktail = await response.json();
  const cocktail = mapRawCocktailData(rawCocktail.drinks[0]);
  res.json(cocktail);
});

app.get('/api/cocktails/:id', async (req, res) => {
  const params = req.params; // {id: 10} for instance.

  // #### Step 1, check if details exist in DB
  // #### Step 2, if it exists, get that and return to client
  // #### Step 3, if it doesn't exist, proceed with fetching from API
  // #### Step 4, save to DB before sending a response back to client

  console.log('COCKTAILS/:ID');
  const stmt = db.prepare('SELECT * FROM cocktails WHERE id = ?');
  const cocktail = stmt.get(params.id); // STEP 1

  console.log('COCKTAIL FROM DB', cocktail);

  if (cocktail) {
    // STEP 2
    const { alcoholic, ingredients, tags } = cocktail;
    cocktail.alcoholic = alcoholic === 'true' ? true : false; // Must convert it back from a string to a boolean
    cocktail.ingredients = JSON.parse(ingredients); // Must convert it back from a string to a JS array
    cocktail.tags = JSON.parse(tags); // Must convert it back from a string to a JS array
    return res.json(cocktail);
  } else {
    // STEP 3 & 4
    getCocktailByIdFromAPI(params.id).then((cocktail) => {
      saveCocktailToDB(cocktail);
      return res.json(cocktail);
    });
  }
});

app.get('/api/cocktails', async (req, res) => {
  console.log('COCKTAILS');
  // This is what the URL will look like when the request comes:
  // http://localhost:3000/api/cocktails?s=gin
  // Query params is NOT part of the URL, but if they exist Node will handle them.

  // If there is query params in the request URL, this object will be created.
  const queryParams = req.query;

  const path = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${queryParams.s}`;
  const response = await fetch(path);
  const rawCocktails = await response.json();
  const cocktails = rawCocktails.drinks.map((rc) => mapRawCocktailData(rc));
  res.json(cocktails);
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});

// ########## Functions #########
async function getCocktailByIdFromAPI(id) {
  const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(path);
  const rawCocktailById = await response.json();
  const cocktailById = mapRawCocktailData(rawCocktailById.drinks[0]);
  return cocktailById;
}

function saveCocktailToDB(cocktail) {
  const { alcoholic, category, glass, id, ingredients, instructions, name, tags, thumbnail } =
    cocktail;

  const sql = `
    INSERT INTO cocktails (alcoholic, category, glass, id, ingredients, instructions, name, tags, thumbnail)
    VALUES ($alcoholic, $category, $glass, $id, $ingredients, $instructions, $name, $tags, $thumbnail)
  `;

  const stmt = db.prepare(sql);
  console.log('SQL QUERY', sql);

  const result = stmt.run({
    alcoholic: alcoholic ? 'true' : 'false',
    category,
    glass,
    id,
    ingredients: JSON.stringify(ingredients),
    instructions,
    name,
    tags: JSON.stringify(tags),
    thumbnail,
  });

  console.log(result);
}
