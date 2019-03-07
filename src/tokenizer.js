const NUMBER_PATTERN = /\d/;
const OPERATOR_PATTERN = /[+-/*]/;
const TOKEN_TYPES = {
  Literal: 'Literal',
  Operator: 'Operator',
};

const isNumber = str => NUMBER_PATTERN.test(str);
const isOperator = str => OPERATOR_PATTERN.test(str);

const createToken = (type, value) => ({ type, value });

module.exports.tokenize = expr => {
  const tokens = [];
  /** Buffer for reading whole numbers or decimals */
  let literalBuffer = '';

  /** Create and add a literal token with the literal buffer content. */
  const addBufferedLiteral = () => {
    const token = createToken(TOKEN_TYPES.Literal, literalBuffer);
    tokens.push(token);
    /** Reset the buffer for future use */
    literalBuffer = '';
  };

  const addOperator = operator => {
    tokens.push(createToken(TOKEN_TYPES.Operator, operator));
  };

  /** Remove any unneeded whitespaces */
  expr = expr.replace(/\s+/g, '');
  /** Replace commas with dots for floating point operations */
  expr = expr.replace(',', '.');

  const chars = expr.split('');

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (isNumber(char) || char === '.') {
      literalBuffer += char;
    } else {
      addBufferedLiteral();
      if (isOperator(char)) {
        addOperator(char);
      }
    }
  }

  if (literalBuffer.length) {
    addBufferedLiteral();
  }

  return tokens;
};
