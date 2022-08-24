const express = require("express");
const router = require("./routes");
require("./config");
const app = express();

app.use("/", router);

app.listen(3030, () => console.log("server running at port 3030"));
