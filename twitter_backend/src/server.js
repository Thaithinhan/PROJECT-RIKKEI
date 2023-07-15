const app = require('./app/app');

const port = 4000;
app.listen(port, () => {
  console.log(`Server run on port http://localhost:${port}`);
});
