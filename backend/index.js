// Using require is the 'old' way of importing stuff. It uses something called commonJS modules. We want the newer way, wwe want to us ES modules instead.
// const express = require("express")

import express from 'express';
import Database from 'better-sqlite3';
import fetch from 'node-fetch';
import cors from 'cors';
import { mapRawCocktailData } from './utilities.js';

const db = new Database('../cocktails.db');
const app = express();

app.use(cors()); // Middleware, all the requests will pass throught this middleware first, before reaching the endpoints. Cors can be configure to allow or not allow specific requests.

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

app.get('/api/cocktails')

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
