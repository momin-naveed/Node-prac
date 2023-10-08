const mongoose = require('mongoose');
const User = require('../models/createUser.model');
const performTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create a new user
    const newUser = new User({
      firstName: 'Momin',
      lastName: 'Naveed',
      email: 'mominch2@gmail.com',
      password: 'password456',
      confirmPassword: 'password456',
      // ... other user properties
    });

    await newUser.save({ session });

    // Find a user
    const foundUser = await User.findOne({
      email: 'janesmith@example.com',
    }).session(session);

    if (foundUser) {
      // Update the found user's information
      foundUser.firstName = 'Momin';
      await foundUser.save({ session });

      // Delete the user
      await User.deleteOne({ email: 'moinnaves300009@gmail.com' }).session(
        session
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    res.json('Transactiion done');
  } catch (err) {
    // If any operation fails, abort the transaction
    // res.json('Transactiion Not done', err);

    await session.abortTransaction();
    console.error('Transaction aborted:', err);
  } finally {
    // End the session
    session.endSession();
  }
};

module.exports = performTransaction;
