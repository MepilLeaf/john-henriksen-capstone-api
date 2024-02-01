const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const recipesRoutes = require("./routes/recipesRoutes");

const PORT = process.env.port || 5050;

app.use(cors());
app.use(express.json());
app.use("/recipes", recipesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
