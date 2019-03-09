const { parse } = require('./parser.js');

const evaluate = node => {
  const { type, left, right, value } = node;

  if (type === 'number') return Number(value);

  if (type === 'u') return evaluate(right) * -1;

  if (type === '+') return evaluate(left) + evaluate(right);
  if (type === '-') return evaluate(left) - evaluate(right);
  if (type === '*') return evaluate(left) * evaluate(right);
  if (type === '/') return evaluate(left) / evaluate(right);
};

module.exports.calculate = expr => {
  const exprAST = parse(expr);
  return evaluate(exprAST);
};
