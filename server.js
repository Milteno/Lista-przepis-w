const express = require("express");
const path = require("path");
require("dotenv").config();
const config = require("./config");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "./uploads")));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
  .then(() => console.log(`Połączono z bazą danych`))
  .catch(err => console.log(err));

app.use(routes);

app.listen(config.PORT, () => {
  console.log(`Aplikacja uruchomiona na porcie: ${config.PORT}`);
})