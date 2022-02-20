const app = require('./app');

require('dotenv').config();

require('./db');

require('./models');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
