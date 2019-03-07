const { parse } = require('./parser.js');

module.exports.calculate = expr => {
  const exprAST = parse(expr);
  return exprAST.evaluate();
};
