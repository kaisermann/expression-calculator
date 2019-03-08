const { tokenize } = require('../src/tokenizer.js');

const OPERATORS = ['*', '/', '-', '+'];

const createLiteralToken = value => ({ type: 'Literal', value });
const createOperatorToken = value => ({ type: 'Operator', value });

describe('tokenization', () => {
  it('should tokenize numbers as Literal Tokens', () => {
    expect(tokenize('1')).toMatchObject([createLiteralToken('1')]);
  });

  it('should tokenize negative numbers', () => {
    expect(tokenize('-1')).toMatchObject([
      createOperatorToken('-'),
      createLiteralToken('1'),
    ]);
  });

  it('should tokenize operators as Operator Tokens', () => {
    OPERATORS.forEach(op =>
      expect(tokenize(op)).toMatchObject([createOperatorToken(op)]),
    );
  });

  it('should tokenize basic expressions', () => {
    OPERATORS.forEach(op =>
      expect(tokenize(`2 ${op} 2`)).toMatchObject([
        createLiteralToken('2'),
        createOperatorToken(op),
        createLiteralToken('2'),
      ]),
    );
  });
});
