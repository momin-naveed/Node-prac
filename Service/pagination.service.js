const User = require('../models/createUser.model');

const paginationn = async (page, itemsPerPage) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const items = await User.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return { items, currentPage: page, totalPages, totalUsers };
  } catch (err) {
    console.log(err);
  }
};
module.exports = paginationn;
