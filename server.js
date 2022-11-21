
//npm run dev
const express = require('express');
const app = express();
let Pokemon = require('./models/pokemon.js');
const dotenv = require('dotenv')
dotenv.config()
const methodOverride = require("method-override");// import method override
const pokemon = require('./models/pokemon.js');




//Middleware
app.use(express.urlencoded({ extended: true})); // parse data from form
app.use(methodOverride("_method"));
app.use("/static", express.static("public"));

//HOME**
app.get('/pokemon',(req, res)=>{
  res.render('index.ejs',{allpokemon:Pokemon})
})




//INDEX**
app.get('/', (req,res)=> {
  res.render("index.ejs", 
  {
    allpokemon: Pokemon
  });
});

// New Route** - GET to /pokemon/new - render a page with a form to create a NEW pokemon
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

//
// DELETE** Route - DELETE to /pokemon/:id - deletes the specified
app.delete("/pokemon/:id", (req, res) => {
  //splice the item out of the array
  Pokemon.splice(req.params.id, 1)
  // redirect user back to index
  res.redirect("/pokemon")
})


//UPDATE Route
// update route = PUT to /pokemon/:id - update the pokemon with info from a form
app.put("/pokemon/:id", (req, res) => {
  console.log(req.body);
  // updating pokemon
  const updateTypeArray = req.body.type.split(',');  //Take string from edited type and convert back to array
  const newPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: updateTypeArray,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spAttack,
      spdefense: req.body.spDefense,
      speed: req.body.speed
    }
  };
  pokemon[req.params.id] = newPokemon;
  // redirect user back to index
  res.redirect("/pokemon");
})


// Create Route** - POST to /pokemon - receive the data from the form and create a NEW pokemon then redirect the user back to index
app.post("/pokemon", (req, res) => {
  // push the new pokemon to array
const typeArray = req.body.type.split(',');
const newPokemon = {
  name: req.body.name,
  img: req.body.img,
  type: typeArray,
  stats: {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    spattack: req.body.spAttack,
    spdefense: req.body.spDefense,
    speed: req.body.speed
  }
};

pokemon.unshift(newPokemon)
// redirect back to index page
res.redirect("/pokemon")
});


//EDIT Route
// EDIT route = GET to /pokemon/:id/edit - render a form to edit the pokemon
app.get("/pokemon/:id/edit", (req, res) => {
    // render edit.ejs with the existing pokemon data
    res.render("edit.ejs", {
    Pokemon: pokemon[req.params.id],
    index: req.params.id
    })
    
})


// SHOW**
//must be at bottom
app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', { poke: Pokemon[req.params.id], index: req.params.id });//giving the show one poke
  });
  
  

//LISTENER
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
});