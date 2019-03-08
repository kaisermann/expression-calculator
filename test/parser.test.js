const { parse } = require('../src/parser.js');
const { AST } = require('../src/ast.js');

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
    expect(parse('2 + 2').get()).toMatchObject(n('+', 2, 2));
    expect(parse('2 + 10 / 2').get()).toMatchObject(n('+', 2, n('/', 10, 2)));
  });

  it('should process same precedence operators correctly', () => {
    expect(parse('7 - 6 / 2 * 4').get()).toMatchObject(
      n('-', 7, n('*', n('/', 6, 2), 4)),
    );
  });
});
