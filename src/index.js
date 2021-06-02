const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
// const dotenv = require("dotenv");
const compression = require("compression");

const db_connect = require("./tools/db-connect");
const { PUBLIC_FOLDER_NAME } = require("./global/constants");

const app = express();
require('dotenv').config();
const SERVER_PORT = process.env.PORT;

db_connect
  .DBConnectMongoose()
  .then(() => {
    const routes = require("./routes");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(logger("dev"));
    app.use(compression());
    app.use(express.static(PUBLIC_FOLDER_NAME));
    const whitelist = ["*"];
    app.disable("x-powered-by");
    app.options(whitelist, cors());
    app.use(
      cors({
        credentials: true,
        origin(origin, callback) {
          callback(null, true);
        },
      })
    );

    routes.assignRoutes(app);
    app.listen(SERVER_PORT);
    console.log(`Server listening on port ` + SERVER_PORT);
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
