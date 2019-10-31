const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-k7m4f.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on("connect", socket => {
  //console.log(socket.handshake.query);
  //console.log("Usuário conectado", socket.id);

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

//GET. POST, PUT, DELETE

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para adição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

//app.use(cors({ oriigin: "http://localhost:3333"}));
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
