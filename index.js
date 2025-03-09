require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Port = process.env.PORT || 3001;
const userRouter = require("./routes/user.route");
const gstRouter = require("./routes/gst.route");
require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRouter);
app.use("/api/gst", gstRouter);

app.listen(Port, () => {
  console.log(`Server Started At Port - ${Port}`);
});
