const { TOKEN_TYPES } = require('./tokenizer.js');

/** Create a new node for an AST */
const createNode = (token, left = null, right = null) => {
  const type = token.type === TOKEN_TYPES.Operator ? token.value : 'number';
  const node = { type, left, right };

  if (token.type === TOKEN_TYPES.Literal) {
    node.value = token.value;
  }

  return node;
};

/** Create a simple AST with number/operator nodes */
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
      tree.push(createNode(token));
    },
    addOperator(token) {
      const [right, left] = [tree.pop(), tree.pop()];
      tree.push(createNode(token, left, right));
    },
    evaluate() {
      if (tree.length > 0) {
        return evalToken(tree[0]);
      }
    },
  };
};
