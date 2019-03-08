const NUMBER_PATTERN = /\d/;
const OPERATOR_PATTERN = /[+-/*]/;

const isNumber = str => NUMBER_PATTERN.test(str);
const isOperator = str => OPERATOR_PATTERN.test(str);
const createToken = (type, value) => ({ type, value });

const TOKEN_TYPES = {
  Literal: 'Literal',
  Operator: 'Operator',
};
module.exports.TOKEN_TYPES = TOKEN_TYPES;

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

  const chars = expr
    /** Remove any unneeded whitespaces */
    .replace(/\s+/g, '')
    /** Replace commas with dots for floating point operations */
    .replace(',', '.')
    /** Split the expression into individual characters */
    .split('');

  /** Allow to comment a line beginning with '#' */
  if (chars[0] === '#') {
    return;
  }

  chars.forEach(char => {
    if (isNumber(char) || char === '.') {
      literalBuffer += char;
      return;
    }

    /** If encountered anything but a number, release the literal buffer */
    if (literalBuffer.length) {
      addBufferedLiteral();
    }

    if (isOperator(char)) {
      addOperator(char);
      return;
    }

    throw new Error(`Invalid input "${char}" at ${expr}`);
  });

  /** Release the literal buffer if there's anything there */
  if (literalBuffer.length) {
    addBufferedLiteral();
  }

  return tokens;
};
