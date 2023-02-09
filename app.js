const express = require('express');

const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Beers',
    navbar: true
  });
});

app.get('/beers', async (req, res, next) => {
  try {
    const beerImg = await punkAPI.getBeers();
    res.render('beers', {
      allBeerImg: beerImg,
      title: 'Beers',
      navbar: true,
      beerpartial: true
    });
  } catch (e) {
    next(e);
  }
});

app.get('/beer/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const beerImg = await punkAPI.getBeer(id);
    res.render('beers', {
      allBeerImg: beerImg,
      title: 'Beers',
      navbar: true,
      beerpartial: true
    });
  } catch (e) {
    next(e);
  }
});

app.get('/random-beer', async (req, res, next) => {
  try {
    const displayRandomImg = await punkAPI.getRandom();
    console.log(displayRandomImg);
    res.render('random-beer', {
      beerRandom: displayRandomImg,
      title: 'Random Beer',
      navbar: true,
      beerpartial: true
    });
  } catch (e) {
    next(e);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
