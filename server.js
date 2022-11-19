
//npm run dev
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const dotenv = require('dotenv')
dotenv.config()
const methodOverride = require("method-override")// import method override

const DATABASE_URL= 'mongodb+srv://KayFernander:KarenMongoDB@sei.2v5tidb.mongodb.net/pokedex?retryWrites=true&w=majority';


//Middleware
app.use(express.urlencoded({ extended: true})); // parse data from form
app.use(methodOverride("_method"));
app.use("/static", express.static("public"));


app.get('/pokemon',(req, res)=>{
  res.render('index.ejs')
})




//INDEX
app.get('/', (req,res)=> {
  res.render("index.ejs", {data: Pokemon});
});





// SHOW
app.get('/:id', (req, res) => {
  res.render('show.ejs', { data: Pokemon[req.params.id] });
  });
  
  

//LISTENER
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
});