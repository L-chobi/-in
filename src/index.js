const app = require('./app');

require('./db');

require('./models');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
