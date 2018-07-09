
import {objectOrDefault} from './value-or-default';

describe('Util test' , () => {
  it('should test default value for objectOrDefault', () => {
    expect(objectOrDefault(5)).toEqual({});
  });
});
