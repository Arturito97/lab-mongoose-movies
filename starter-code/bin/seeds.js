const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');

const DB_NAME = 'celebrity_dev';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Tom Cruise',
    occupation: 'Actor',
    catchphrase: 'I\'m an actor to action movies.'  
  },
  {
    name: 'Cristiano Ronaldo',
    occupation: 'Football player',
    catchphrase: 'SIIIIIIII'
  },
  {
    name: 'Charlotte de Witte',
    occupation: 'DJ',
    catchphrase: 'I\'m the queen of techno 👑'
  }
];

Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occured ${err}`));