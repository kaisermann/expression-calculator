const { parse } = require('./parser.js');

module.exports.calculate = expr => {
  parse(expr);
  return null;
};
