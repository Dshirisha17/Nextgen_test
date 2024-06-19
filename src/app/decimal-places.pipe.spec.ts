import { DecimalPlacesPipe } from './decimal-places.pipe';

describe('DecimalPlacesPipe', () => {
  let pipe: DecimalPlacesPipe;

  beforeEach(() => {
    pipe = new DecimalPlacesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms an integer without decimals', () => {
    const value = 1000;
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('1,000.00');
  });

  it('transforms a float with decimals', () => {
    const value = 1234.5678;
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('1,234.57');
  });

  it('transforms a string representing an integer without decimals', () => {
    const value = '5000';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('5,000.00');
  });

  it('transforms a string representing a float with decimals', () => {
    const value = '9876.54321';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('9,876.54');
  });

  it('transforms a string representing a float with excessive decimals', () => {
    const value = '123.456789';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('123.46');
  });

  // it('returns empty string for invalid input (null)', () => {
  //   const value = null;
  //   const transformedValue = pipe.transform(value);
  //   expect(transformedValue).toEqual('');
  // });

  it('returns empty string for invalid input (string with non-numeric characters)', () => {
    const value = 'abc';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('');
  });
});
