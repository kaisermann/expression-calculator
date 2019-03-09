const { parse } = require('../src/parser.js');

const isNumber = n => n != null && Number.isFinite(+n);

const n = (type, left = null, right = null) => {
  if (isNumber(left)) left = n(left);
  if (isNumber(right)) right = n(right);

  /** operators nodes */
  if (!isNumber(type)) return { type, left, right };

  return { type: 'number', value: `${type}`, left, right };
};

describe('parsing', () => {
  it('should create an AST from tokens', () => {
    expect(parse('2 + 2')).toMatchObject(n('+', 2, 2));
    expect(parse('2 + 10 / 2')).toMatchObject(n('+', 2, n('/', 10, 2)));
  });

  it('should process same precedence operators correctly', () => {
    expect(parse('7 - 6 / 2 * 4')).toMatchObject(
      n('-', 7, n('*', n('/', 6, 2), 4)),
    );
  });

  it('should throw an exception for a a binary operator have any null operand', () => {
    expect(() => parse('2+3*')).toThrow();
    expect(() => parse('2-')).toThrow();
    expect(() => parse('2+')).toThrow();
    expect(() => parse('2/')).toThrow();
    expect(() => parse('-2')).not.toThrow();
  });
});
