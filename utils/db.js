const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {

  const conn = await mongoose.connect( 'mongodb+srv://wjdevelopersolution:Lc1sTQWf6LYTiFce@cluster0.jnklj.mongodb.net/coqueterias', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected to: ${conn.connection.host }`.cyan.underline.bold);
}

module.exports = connectDB;