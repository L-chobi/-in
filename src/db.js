const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleConnectionOpen = () => {
  console.log('Connected to DB');
};

const handleConnectionError = (error) => {
  console.log(`Error on DB Connections:${error}`);
};

db.once('open', handleConnectionOpen);
db.on('error', handleConnectionError);

module.exports = db;
