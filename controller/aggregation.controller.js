const User = require('../models/createUser.model');

const verifiedStatus = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: '$verified',
          count: { $sum: 1 },
        },
      },
    ]);
    if (!result) {
      return res.json('Data not found..');
    }
    return res.json(result);
  } catch (err) {
    res.json('errrrr===>>>>', err);
  }
};

const averageAge = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: '$age',
          count: { $sum: 1 },
        },
      },
    ]);
    if (!result) {
      return res.json('Data not found..');
    }
    return res.json(result);
  } catch (err) {
    res.json('errrrr===>>>>', err);
  }
};

const commonName = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: '$age',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 8,
      },
    ]);
    if (!result) {
      return res.json('Data not found..');
    }
    return res.json(result);
  } catch (err) {
    res.json('errrrr===>>>>', err);
  }
};
// Average age by role
const ageByRole = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          age: { $type: 'string' }, // Filter documents with valid numeric age
        },
      },
      {
        $addFields: {
          ageNumeric: { $toInt: '$age' }, // Convert age to a numeric field
        },
      },
      {
        $group: {
          _id: '$role',
          averageAge: { $avg: '$ageNumeric' },
        },
      },
      //   {
      //     $project: {
      //       _id: 1,
      //       averageAge: 1,
      //     },
      //   },
    ]);
    if (!result) {
      return res.json('Data not found..');
    }
    return res.json(result);
  } catch (err) {
    res.json('errrrr===>>>>', err);
  }
};

// Count Users by AgeGroup
const countUsersByGroup = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          ageGroup: {
            $switch: {
              branches: [
                { case: { $lte: ['$age', 18] }, then: 'Under 18' },
                { case: { $lte: ['$age', 30] }, then: '18-30' },
                { case: { $lte: ['$age', 50] }, then: '31-50' },
              ],
              default: '51 and above',
            },
          },
        },
      },
      {
        $group: {
          _id: '$ageGroup',
          count: { $sum: 1 },
        },
      },
    ]);
    if (!result) {
      return res.json('Data not found..');
    }
    return res.json(result);
  } catch (err) {
    res.json('errrrr===>>>>', err);
  }
};

module.exports = {
  verifiedStatus,
  averageAge,
  commonName,
  ageByRole,
  countUsersByGroup,
};
