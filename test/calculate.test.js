const { calculate } = require('../src/index.js');

const SAMPLES = [
  ['2 + 3 * 4 - 8', 6],
  ['18 - 5 + 2', 15],
  ['6 / 4 - 1', 0.5],
  ['7 - 6 / 2 * 4', -5],
  ['18 + 3 * 6 - 10 / 4 * 2 + 5.5 * 2', 42],
  ['4 + 5 / 2', 6.5],
  ['3 * 2', 6],
  ['5.01 * 4', 20.04],
];

describe('calculations', () => {
  it('should accept single number expression', () => {
    expect(calculate('2')).toBe(2);
  });

  it('should perform additions', () => {
    expect(calculate('2+2')).toBe(4);
  });

  it('should perform negative additions', () => {
    expect(calculate('-2+2')).toBe(0);
    expect(calculate('2+-2')).toBe(0);
  });

  it('should perform subtractions', () => {
    expect(calculate('2-2')).toBe(0);
  });

  it('should perform negative subtractions', () => {
    expect(calculate('-2-2')).toBe(-4);
  });

  it('should perform multiplications', () => {
    expect(calculate('2*2')).toBe(4);
  });

  it('should perform negative multiplications', () => {
    expect(calculate('-2*2')).toBe(-4);
  });

  it('should perform divisions', () => {
    expect(calculate('2/2')).toBe(1);
  });

  it('should perform negative divisions', () => {
    expect(calculate('-2/2')).toBe(-1);
  });

  it('should correctly evaluate basic arithmetic expressions', () => {
    SAMPLES.forEach(([expr, answer]) => expect(calculate(expr)).toBe(answer));
  });
});
