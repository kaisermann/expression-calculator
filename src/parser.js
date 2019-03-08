const { tokenize, TOKEN_TYPES } = require('./tokenizer.js');
const { AST } = require('./ast.js');

/** Operator precedence mapping */
const PRECEDENCE = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
};

/** Peek the top of a simplified stack */
const peekTop = stack => stack[stack.length - 1];

module.exports.parse = expr => {
  const tokens = tokenize(expr);
  const tree = AST();
  const operatorStack = [];

  if (!tokens) return tree;

  tokens.forEach(token => {
    if (token.type === TOKEN_TYPES.Literal) {
      tree.addLiteral(token);
      return;
    }

    if (token.type === TOKEN_TYPES.Operator) {
      if (operatorStack.length) {
        let topOperator = peekTop(operatorStack);
        while (
          topOperator &&
          PRECEDENCE[topOperator.value] >= PRECEDENCE[token.value]
        ) {
          tree.addOperator(operatorStack.pop());
          topOperator = peekTop(operatorStack);
        }
      }
      operatorStack.push(token);
    }
  });

  /** Append any operators left in the stack */
  for (let operatorLeft; (operatorLeft = operatorStack.pop()) != null; ) {
    tree.addOperator(operatorLeft);
  }

  return tree;
};
