const { parse } = require('./parser.js');

const evalNode = node => {
  const { type, left, right, value } = node;

  if (type === 'number') return Number(value);

  if (type === 'u') return evalNode(right) * -1;

  if (type === '+') return evalNode(left) + evalNode(right);
  if (type === '-') return evalNode(left) - evalNode(right);
  if (type === '*') return evalNode(left) * evalNode(right);
  if (type === '/') return evalNode(left) / evalNode(right);
};

module.exports.calculate = expr => {
  const exprAST = parse(expr).get();
  return evalNode(exprAST);
};
