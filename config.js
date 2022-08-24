const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shdow-monarch:Bhar%402001@db.uci5gvf.mongodb.net/crudApi"
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));
