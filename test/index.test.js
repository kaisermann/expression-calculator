const { execSync } = require('child_process');
const { resolve } = require('path');
const { EOL } = require('os');

const binPath = resolve(__dirname, '..', 'calculator');

const run = exprs =>
  execSync(binPath, {
    input: exprs.join(EOL),
  })
    .toString()
    .trim();

describe('calculator bin', () => {
  it('should accept a math expression line as input', () => {
    expect(run(['2+2'])).toBe('4');
  });

  it('should accept multiple math expression lines as input', () => {
    expect(
      run([
        '2 + 3 * 4 - 8',
        '18 - 5 + 2',
        '6 / 4 - 1',
        '7 - 6 / 2 * 4',
        '18 + 3 * 6 - 10 / 4 * 2 + 5.5 * 2',
        '4 + 5 / 2',
        '3 * 2',
        '5.01 * 4',
      ]),
    ).toBe(['6', '15', '0.5', '-5', '42', '6.5', '6', '20.04'].join(EOL));
  });
});
