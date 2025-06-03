const { app } = require("./app");

app.listen(9999, () => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port: 9999`);
  }
});
