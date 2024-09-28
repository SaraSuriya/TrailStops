const mongoose = require('mongoose');

// console.log(mongoose.connection.readyState);

const URL = 'mongodb://localhost:27017/TrailStops';

// async function main() {
//   await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
// };

async function main() {
  await mongoose.connect(URL);
}

main();

module.exports = mongoose;