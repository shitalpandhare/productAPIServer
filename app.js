const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
require("dotenv").config();

const app = express();

const productRoutes = require("./routes/productsRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,Origin,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  next();
});

//

app.use("/api/products", productRoutes);

//

app.use("*", (req, res) => {
  res.status(404).json({ error: "No routes matched" });
  res.end();
});

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
