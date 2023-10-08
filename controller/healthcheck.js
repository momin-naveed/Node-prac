const paginationn = require('../Service/pagination.service');
const User = require('../models/createUser.model');

const healthCheck = (req, res) => {
  res.json('Running');
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.json('users not found');
    }
    res.json({ users, msg: 'users received' });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

const pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 3; // Number of items per page
    const paginationResult = await paginationn(page, itemsPerPage);
    res.json(paginationResult);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { healthCheck, getAllUsers, pagination };
