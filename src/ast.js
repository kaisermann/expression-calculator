const { TOKEN_TYPES } = require('./tokenizer.js');

const getNode = (token, left = null, right = null) => {
  const node = {
    type: token.type === TOKEN_TYPES.Operator ? token.value : 'number',
    left,
    right,
  };

  if (token.type === TOKEN_TYPES.Literal) {
    node.value = token.value;
  }

  return node;
};

module.exports.AST = () => {
  const tree = [];

  const evalToken = ({ type, left, right, value }) => {
    if (type === 'number') return Number.parseFloat(value);
    if (type === '+') return evalToken(left) + evalToken(right);
    if (type === '-') return evalToken(left) - evalToken(right);
    if (type === '*') return evalToken(left) * evalToken(right);
    if (type === '/') return evalToken(left) / evalToken(right);
  };

  return {
    addLiteral(token) {
      tree.push(getNode(token));
    },
    addOperator(token) {
      const [right, left] = [tree.pop(), tree.pop()];
      tree.push(getNode(token, left, right));
    },
    evaluate() {
      if (tree.length > 0) {
        return evalToken(tree[0]);
      }
    },
  };
};
