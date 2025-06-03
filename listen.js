const { app } = require("./app");

app.listen(9999, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port: 9999`);
  }
});
