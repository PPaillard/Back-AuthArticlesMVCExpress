require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5050", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
