const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is connected at ${conn.connection.host}`);
  } catch (err) {
    throw new Error('Database Not Connected...');
  }
};
module.exports = connectDB;
