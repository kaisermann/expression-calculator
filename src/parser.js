const { tokenize, TOKEN_TYPES } = require('./tokenizer.js');

/** Operator precedence mapping */
const PRECEDENCE = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
  u: 2,
};

const ASSOCIATIVITY = {
  u: 'right',
};

const UNARY_OPS = {
  u: 1,
};

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
const AST = () => {
  const exprStack = [];

  return {
    addLiteral(token) {
      exprStack.push(createNode(token));
    },
    addOperator(token) {
      if (token.value in UNARY_OPS) {
        const right = exprStack.pop();
        exprStack.push(createNode(token, null, right));
        return;
      }

      const [right, left] = [exprStack.pop(), exprStack.pop()];

      if (left == null || right == null) {
        throw new Error(
          `A binary ("${token.value}") operator can't have null operands`,
        );
      }

      exprStack.push(createNode(token, left, right));
    },
    get() {
      if (exprStack.length > 1) {
        throw new Error(
          'The expression stack should be of size 1 after parsing',
        );
      }
      return exprStack.length ? exprStack[0] : null;
    },
  };
};

/** Peek the top of a simplified stack */
const peekTop = stack => stack[stack.length - 1];

module.exports.parse = expr => {
  const tokens = tokenize(expr);
  const tree = AST();
  const operatorStack = [];

  if (!tokens) return tree.get();

  const prec = operator => PRECEDENCE[operator.value];
  const assoc = operator => ASSOCIATIVITY[operator.value] || 'left';

  tokens.forEach(token => {
    if (token.type === TOKEN_TYPES.Literal) {
      tree.addLiteral(token);
      return;
    }

    if (token.type === TOKEN_TYPES.Operator) {
      if (operatorStack.length) {
        let top = peekTop(operatorStack);
        while (
          top &&
          (prec(top) >= prec(token) ||
            (prec(top) === prec(token) && assoc(top) !== 'right'))
        ) {
          tree.addOperator(operatorStack.pop());
          top = peekTop(operatorStack);
        }
      }
      operatorStack.push(token);
    }
  });

  /** Append any operators left in the stack */
  for (let operatorLeft; (operatorLeft = operatorStack.pop()) != null; ) {
    tree.addOperator(operatorLeft);
  }

  return tree.get();
};
