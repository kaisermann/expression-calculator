const { calculate } = require('../src/index.js');

describe('calculations', () => {
  it('should accept single number expression', () => {
    expect(calculate('2')).toBe(2);
  });

  it('should perform additions', () => {
    expect(calculate('2+2')).toBe(4);
    expect(calculate('-2+2')).toBe(0);
    expect(calculate('2+-2')).toBe(0);
  });

  it('should perform subtractions', () => {
    expect(calculate('2-2')).toBe(0);
    expect(calculate('-2-2')).toBe(-4);
  });

  it('should perform multiplications', () => {
    expect(calculate('2*2')).toBe(4);
    expect(calculate('-2*2')).toBe(-4);
  });

  it('should perform divisions', () => {
    expect(calculate('2/2')).toBe(1);
    expect(calculate('-2/2')).toBe(-1);
  });
});
