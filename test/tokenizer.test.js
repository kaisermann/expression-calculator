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
      createOperatorToken('u'),
      createLiteralToken('1'),
    ]);
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

  it('should ignore lines starting with "#"', () => {
    expect(tokenize('#2+2')).toBe(null);
  });

  it('should throw an exception for a invalid input character (not operator/number)', () => {
    expect(() => tokenize('2a+%3')).toThrowError();
  });
});
