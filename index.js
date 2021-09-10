const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT;

dbConnection();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/events", require("./routes/events"));

app.use(express.static("public"));

app.listen(port, () => console.log(`Server running in port ${port}`));
