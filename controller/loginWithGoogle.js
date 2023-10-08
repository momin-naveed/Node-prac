const path = require('path');
const loginWthGoogle = async (req, res) => {
  res.render(path.join(__dirname, 'login.ejs'));
};
module.exports = loginWthGoogle;
