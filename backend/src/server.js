const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-k7m4f.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//GET. POST, PUT, DELETE

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para adição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

//app.use(cors({ oriigin: "http://localhost:3333"}));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
