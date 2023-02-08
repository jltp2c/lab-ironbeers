const express = require('express');

const hbs = require('hbs');
const async = require('hbs/lib/async');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`);
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Beers',
    navbar: true
  });
});
app.get('/beers', async (req, res, next) => {
  const displayBeerImg = await punkAPI.getBeers();
  console.log(displayBeerImg);
  try {
    res.render('beers', {
      allBeer: displayBeerImg,
      title: 'Beers',
      navbar: true
    });
  } catch (e) {
    next(e);
  }
});
app.get('/random-beer', async (req, res, next) => {
  const displayRandomImg = await punkAPI.getRandom();

  try {
    res.render('random-beer', {
      beerRandom: displayRandomImg,
      title: 'Random Beer',
      navbar: true
    });
  } catch (e) {
    next(e);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
