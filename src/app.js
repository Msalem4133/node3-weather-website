const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express();
//Define paths for Express config
const publicdir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//setup handler bar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setup satitic directory
app.use(express.static(publicdir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'andrew mead',
    footer: 'made by mido'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'andrew mead',
    footer: 'made by mido'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'andrew mead',
    footer: 'made by mido'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    msg: '25l3333333',
    footer: 'salemmmmm'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error:"you must provid address to get weather"
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error :"error"})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  console.log(req.query)
  res.send({
    products: []
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    msg: 'mfysh hena',
    footer: 'salemmmmm'
  });
});
app.listen(3000, () => {
  console.log('server startt');
});
