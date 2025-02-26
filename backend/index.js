import express from 'express';
import Database from 'better-sqlite3';
import fetch from 'node-fetch';
import cors from 'cors';
import { mapRawCocktailData } from './utilities.js';

const db = new Database('../cocktails.db');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Nothing here folks');
});

app.get('/api/cocktails/random', async (req, res) => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(path);
  const rawCocktail = await response.json();
  const cocktail = mapRawCocktailData(rawCocktail.drinks[0]);
  res.json(cocktail);
});

app.get('/api/cocktails/:id', async (req, res) => {
  const params = req.params; // {id: 10} for instance.
  const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const response = await fetch(path);
  const rawCocktailById = await response.json();
  const cocktailById = mapRawCocktailData(rawCocktailById.drinks[0]);
  res.json(cocktailById);
});

app.get('/api/cocktails', async (req, res) => {
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
