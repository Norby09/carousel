
import { objectOrDefault, numberOrDefault } from './value-or-default';

describe('Util test' , () => {
  it('should set default value for object', () => {
    expect(objectOrDefault(5)).toEqual({});
  });

  it('should set default value for number', () => {
    expect(numberOrDefault("a")).toEqual(0);
  });
});
