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

  return {
    addLiteral(token) {
      tree.push(createNode(token));
    },
    addOperator(token) {
      const [right, left] = [tree.pop(), tree.pop()];
      tree.push(createNode(token, left, right));
    },
    get() {
      return tree.length ? tree[0] : null;
    },
  };
};
