const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const createUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required...'],
    min: [4, 'Name is too short'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required...'],
    min: [4, 'Name is too short'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required...'],
    unique: [true, 'Email Is aleardy exist, try witn another one'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required..'],
    min: [8, 'password must conatain atleast 8 charcters'],
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
  },
  no: {
    type: String,
  },
  otp: {
    type: {
      code: Number,
      time: Date,
    },
  },
  avatar: {
    type: String,
  },
  googleId: {
    type: String,
  },
  age: {
    type: String,
  },
});

// Pre save function to encrypt the password into database
createUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    this.confirmPassword = hash;
    return next();
  } catch (err) {
    console.log(err);
  }
});

// Function to decrypt the password into database
createUserSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
};

const User = mongoose.model('User', createUserSchema);

module.exports = User;
