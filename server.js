// Env varible
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config({ path: "./.config.env" });

// imports files
const app = require("./app");
const port = process.env.PORT || 6000;

// MongoDB Data base connection
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection sucessful!");
    console.log(process.env.NODE_ENV);
  })
  .catch((err) => {
    console.log(err);
  });

// Lisiten Server
app.listen(port, () => {
  console.log(`server is Running on port ${port}`);
});
