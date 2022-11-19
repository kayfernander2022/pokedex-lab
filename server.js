
//npm run dev
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const dotenv = require('dotenv')
dotenv.config()
const methodOverride = require("method-override");// import method override
let pokemon = require('./models/pokemon.js');

const DATABASE_URL= 'mongodb+srv://KayFernander:KarenMongoDB@sei.2v5tidb.mongodb.net/pokedex?retryWrites=true&w=majority';


//Middleware
app.use(express.urlencoded({ extended: true})); // parse data from form
app.use(methodOverride("_method"));
app.use("/static", express.static("public"));


app.get('/pokemon',(req, res)=>{
  res.render('index.ejs',{allpokemon:Pokemon})
})

//app.get('/pokemon/id',(rq,tes)=>{
 // console.log(req.params)
//  res.render("show.ejs")
//})


//INDEX
app.get('/', (req,res)=> {
  res.render("index.ejs", {allpokemon: Pokemon});
});


//Delete?? GETTING ERROR
app.delete('/pokemon/:id', (req, res) => {
  pokemon = pokemon.filter((pokemon,index)=> index !== req.params.id)
  res.render('index.ejs', {allpokemon: pokemon})
  });

// SHOW
//must be at bottom
app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', { poke: Pokemon[req.params.id], index: req.params.id });//giving the show one poke
  });
  
  

//LISTENER
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
});