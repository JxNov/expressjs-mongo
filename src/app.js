const express = require("express");
const morgan = require("morgan");

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");
const database = require("./config/database");

const app = express();

// Static files
app.use(express.static("public"));

// Logger
app.use(morgan("dev")); // dev, combined, tiny, short

// Body parser
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// DB connection
database.connect();

// Routes
app.use(webRouter);
app.use("/api", apiRouter);

// Error handler
const errorHandler = (err, req, res, next) => {
  const { accept } = req.headers;

  if (accept?.includes("application/json")) {
    return res.status(500).json({ message: err });
  }

  res.status(500).render("errors/500", { message: err });
};

const notFoundHandler = (req, res, next) => {
  const { accept } = req.headers;

  if (accept?.includes("application/json")) {
    return res.status(404).json({ message: "Page not found" });
  }

  res.status(404).render("errors/404");
};

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
